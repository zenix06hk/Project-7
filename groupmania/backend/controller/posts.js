const db = require('../db');

//To securely transfer information over the web

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { post_content } = req.body;
    console.log('post');
    console.log(req.user);

    // return;

    const result = await db.query(
      'INSERT INTO post (user_id, post_content, post_img, likes, dislikes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, post_content, null, 0, 0]
      // [postContent]
    );

    const post_id = result.rows[0].post_id;
    const post = result.rows[0].post_content;
    const postImg = result.rows[0].post_img;
    const likes = result.rows[0].likes;
    const dislikes = result.rows[0].dislikes;

    console.log(result);

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
      `SELECT post.user_id, post.post_id, post.post_content, post.likes, post.dislikes,
        users.first_name, users.last_name, users.avatar,
        COALESCE(popularity.likes, 0) AS user_likes,
        COALESCE(popularity.dislikes, 0) AS user_dislikes,
        COALESCE(json_agg(
		      json_build_object(
			  	'comment_name',concat_ws(' ', commenter.first_name, commenter.last_name),
			    'comment_content', comment.comment_content,
			    'comment_id', comment.comment_id
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
      GROUP BY post.post_id, post.user_id, post.post_content, post.likes, post.dislikes,
        users.user_id, users.first_name, users.last_name, users.avatar,
        popularity.likes, popularity.dislikes`,
      [userId]
    );
    console.log(result);
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
    console.log('comment');
    console.log(req.body);

    const result = await db.query(
      // 'INSERT INTO post (comment_content) VALUES ($1) RETURNING *',
      'INSERT INTO comment (user_id, post_id, comment_content) VALUES ($1, $2, $3) RETURNING *',
      [userId, post_id, comment_content]
    );

    const comment = result.rows[0].comment_content;

    console.log(comment);

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
    const { post_id } = req.body;
    const reactionTypeRaw = req.body.reactionType;

    if (!post_id) {
      return res.status(400).json({
        error: 'post_id is required',
        success: false,
      });
    }

    //First time input likes/dislikes reactionType

    const likesFlag = Number(req.body.likes) === 1 ? 1 : 0;
    const dislikesFlag = Number(req.body.dislikes) === 1 ? 1 : 0;

    let reactionType = reactionTypeRaw;
    if (!reactionType) {
      if (likesFlag === 1 && dislikesFlag === 0) reactionType = 'thumbsUp';
      else if (dislikesFlag === 1 && likesFlag === 0)
        reactionType = 'thumbsDown';
    }

    if (reactionType !== 'thumbsUp' && reactionType !== 'thumbsDown') {
      return res.status(400).json({
        error: 'reactionType must be "thumbsUp" or "thumbsDown"',
        success: false,
      });
    }
    //db logic of checking if the user has already liked/disliked and neutral functionality

    const existing = await db.query(
      'SELECT likes, dislikes FROM popularity WHERE user_id = $1 AND post_id = $2 LIMIT 1',
      [userId, post_id]
    );

    const currentLikes = existing.rowCount
      ? Number(existing.rows[0].likes) === 1
        ? 1
        : 0
      : 0;
    const currentDislikes = existing.rowCount
      ? Number(existing.rows[0].dislikes) === 1
        ? 1
        : 0
      : 0;

    let likesChange = currentLikes;
    let dislikesChange = currentDislikes;

    //thumbs up logic
    if (reactionType === 'thumbsUp') {
      if (currentLikes === 1) {
        likesChange = 0;
        dislikesChange = 0;
      } else {
        likesChange = 1;
        dislikesChange = 0;
      }
    }
    //thumbs down logic
    else {
      if (currentDislikes === 1) {
        likesChange = 0;
        dislikesChange = 0;
      } else {
        likesChange = 0;
        dislikesChange = 1;
      }
    }

    // Ensure only one row exists per user+post even if the DB schema doesn't enforce it.
    await db.query(
      'DELETE FROM popularity WHERE user_id = $1 AND post_id = $2',
      [userId, post_id]
    );

    // Insert the new reaction, or neutral if both likesChange and dislikesChange are 0
    const result = await db.query(
      'INSERT INTO popularity (user_id, post_id, likes, dislikes) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, post_id, likesChange, dislikesChange]
    );

    // Calculation of difference
    const likesDiff = likesChange - currentLikes;
    const dislikesDiff = dislikesChange - currentDislikes;

    // Update post's total likes and dislikes based on the difference
    await db.query(
      'UPDATE post SET likes = GREATEST(likes + $1, 0), dislikes = GREATEST(dislikes + $2, 0) WHERE post_id = $3',
      [likesDiff, dislikesDiff, post_id]
    );

    res.status(200).json({
      message: 'Popularity updated successfully',
      success: true,
      data: {
        post_id: post_id,
        likes: likesChange,
        dislikes: dislikesChange,
        reactionType,
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
