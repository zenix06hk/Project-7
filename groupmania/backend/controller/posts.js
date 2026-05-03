const db = require('../db');

//To securely transfer information over the web

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const imageUrl = req?.file?.filename ? `${req.file.filename}` : null;
    const description = req.body.description;
    // console.log(imageUrl, 'post image');
    // console.log(description, 'post description');

    const result = await db.query(
      'INSERT INTO post (user_id, post_content, post_img, likes, dislikes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, description, imageUrl, 0, 0]
    );

    const post_id = result.rows[0].post_id;
    const post = result.rows[0].post_content;
    const postImg = result.rows[0].post_img;
    const likes = result.rows[0].likes;
    const dislikes = result.rows[0].dislikes;
    // console.log(postImg);
    // console.log(result);

    res.status(201).json({
      message: 'Post created successfully',
      success: true,
      data: {
        post_id: post_id,
        post_content: post,
        post_img: postImg,
        likes: likes,
        dislikes: dislikes,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const result = await db.query(
      `SELECT post.user_id, post.post_id, post.post_content, post.likes, post.dislikes,post.post_img, post.post_time,
        users.first_name, users.last_name, users.avatar,
        COALESCE(popularity.likes, 0) AS user_likes,
        COALESCE(popularity.dislikes, 0) AS user_dislikes,
        COALESCE(json_agg(
		      json_build_object(
			  	'comment_name',concat_ws(' ', commenter.first_name, commenter.last_name),
			    'comment_content', comment.comment_content,
			    'comment_id', comment.comment_id,
			    'comment_avatar', commenter.avatar
		    )
	  ) FILTER (WHERE comment.comment_id IS NOT NULL), '[]') AS comments
      FROM post
      LEFT JOIN comment 
      ON post.post_id = comment.post_id
      LEFT JOIN popularity
      ON post.post_id = popularity.post_id AND popularity.user_id = $1
      INNER JOIN users
      ON post.user_id = users.user_id
	  LEFT JOIN users AS commenter ON comment.user_id = commenter.user_id
      GROUP BY post.post_id, post.user_id, post.post_content, post.likes, post.dislikes, post.post_img, post.post_time,
        users.user_id, users.first_name, users.last_name, users.avatar,post.post_img,
        popularity.likes, popularity.dislikes
      ORDER BY post.post_id DESC`,
      [userId]
    );
    // console.log(result);
    const posts = result.rows;
    res.status(200).json({
      success: true,
      data: {
        post: posts,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

exports.poststream = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT post FROM post ORDER BY post_id DESC'
    );
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { post_id, comment_content } = req.body;
    // console.log('comment');
    // console.log(req.body);

    const result = await db.query(
      // 'INSERT INTO post (comment_content) VALUES ($1) RETURNING *',
      'INSERT INTO comment (user_id, post_id, comment_content) VALUES ($1, $2, $3) RETURNING *',
      [userId, post_id, comment_content]
    );

    const comment = result.rows[0].comment_content;

    // console.log(comment);

    res.status(201).json({
      message: 'Comment created successfully',
      success: true,
      data: {
        comment_content: comment,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

exports.createPopularity = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { post_id, likes, dislikes } = req.body;

    if (!post_id) {
      return res.status(400).json({
        error: 'post_id is required',
        success: false,
      });
    }

    if (likes === dislikes) {
      return res.status(400).json({
        error: 'likes and dislikes cannot be the same',
        success: false,
      });
    }

    // Determine the reaction type for response
    const existing = await db.query(
      'SELECT likes, dislikes FROM popularity WHERE user_id = $1 AND post_id = $2 LIMIT 1',
      [userId, post_id]
    );

    let currentLikes = 0;
    let currentDislikes = 0;

    if (existing.rows.length > 0) {
      if (
        (Number(existing.rows[0].likes) === 1 && likes === 1) ||
        (Number(existing.rows[0].dislikes) === 1 && dislikes === 1)
      ) {
        currentLikes = 0;
        currentDislikes = 0;
      }
      if (Number(existing.rows[0].likes) === 0 && likes === 1) {
        currentLikes = 1;
        currentDislikes = 0;
      }

      if (Number(existing.rows[0].dislikes) === 0 && dislikes === 1) {
        currentLikes = 0;
        currentDislikes = 1;
      }
    } else {
      currentLikes = Number(likes);
      currentDislikes = Number(dislikes);
    }

    // Ensure only one row exists per user+post even if the DB schema doesn't enforce it.
    await db.query(
      'DELETE FROM popularity WHERE user_id = $1 AND post_id = $2',
      [userId, post_id]
    );

    // Insert the new reaction, or neutral if both likesChange and dislikesChange are 0
    const result = await db.query(
      'INSERT INTO popularity (user_id, post_id, likes, dislikes) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, post_id, currentLikes, currentDislikes]
    );

    // console.log(result.rows[0]);

    res.status(200).json({
      message: 'Popularity updated successfully',
      success: true,
      data: {
        post_id: post_id,
        likes: result.rows[0].likes,
        dislikes: result.rows[0].dislikes,
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};
