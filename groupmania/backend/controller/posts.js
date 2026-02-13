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
    // const result = await db.query(`
    //   SELECT post.post_id, post.user_id, post.post_content, post.post_img, post.post_time, post.likes, post.dislikes, users.user_id, users.first_name, users.last_name
    //   FROM post
    //   INNER JOIN users ON post.user_id = users.user_id`);
    const result = await db.query(
      `SELECT post.user_id, post.post_id, post.post_content, users.first_name, users.last_name,
COALESCE(json_agg(
		      json_build_object(
			  	'comment_name',commenter.first_name, 
			    'comment_content', comment.comment_content,
			    'comment_id', comment.comment_id
		    )
	  ) FILTER (WHERE comment.comment_id IS NOT NULL), '[]') AS comments
      FROM post
      LEFT JOIN comment 
      ON post.post_id = comment.comment_id
      INNER JOIN users
      ON post.user_id = users.user_id
	  LEFT JOIN users AS commenter ON comment.user_id = commenter.user_id
      GROUP BY post.post_id, post.user_id, post.post_content, users.user_id, users.first_name, users.last_name`
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
