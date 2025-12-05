const db = require('../db');

//To securely transfer information over the web

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { post_content } = req.body;

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
    const result = await db.query('SELECT post FROM post WHERE userid = $1', [
      posts,
    ]);
    const posts = result.rows;
    res.status(200).json({
      success: true,
      data: {
        post: user.post,
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
