const db = require("../db");

//Password-hashing function
const bcrypt = require("bcrypt");

//To securely transfer information over the web
const jwt = require("jsonwebtoken");
const saltRounds = 10;
exports.test = async (req, res) => {
  res.status(201).json({
    message: "test successfully",
    success: true,
  });
};
//Controller for creating a user account
exports.signUp = async (req, res) => {
  try {
    // console.log(req.body);

    const { username, first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log("hashedPassword", hashedPassword);
    try {
      const result = await db.query(
        "INSERT INTO users (username, first_name, last_name, email, password, avatar)  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          username,
          first_name,
          last_name,
          email,
          hashedPassword,
          "/assets/annoymous_avatar.avif.jpg",
        ]
      );
      const username_data = result.rows[0].username;
      const firstName = result.rows[0].first_name;
      const lastName = result.rows[0].last_name;
      const email_data = result.rows[0].email;
      const password = result.rows[0].password;
      const avatar = result.rows[0].avatar;

      // console.log(result);

      res.status(201).json({
        message: "User created successfully",
        success: true,
        data: {
          username: username_data,
          first_name: firstName,
          last_name: lastName,
          email: email_data,
          avatar: "/assets/annoymous_avatar.avif.jpg",
        },
      });
    } catch (error) {
      if (error.code === "23505") {
        res.status(409).json({
          error: "Duplicate key violation: User ID already exists",
        });
      } else {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
    return;

    // db.query(
    //   "INSERT INTO users (username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    //   [username, first_name, last_name, email, password],
    //   (error, results) => {
    //     if (error) {
    //       throw error;
    //       // res.status(403).send("User already exists");
    //       // return;
    //     }
    //     res
    //       .status(200)
    //       // .send(`User added with ID: ${results.rows[0].id}`)
    //       .json({
    //         message: "Email has been sign up.",
    //         success: true,
    //         data: results.rows[0],
    //       });
    //   }
    // );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  try {
    const result = await db.query(
      "SELECT email, username, avatar, first_name, last_name, userid, password FROM users WHERE email = $1",
      [email]
    );
    // console.log(result?.rows?.length);
    if (result?.rows?.length !== 1) {
      // console.log("hello");
      return res.status(401).json({
        error: "User not found!",
      });
    }
    // console.log(result.rows[0]);
    const comparePassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    // console.log("comparePassword", comparePassword);
    if (!comparePassword) {
      return res.status(401).json({
        error: "Password incorrect!",
      });
    }

    //Creation of the authentication token
    const token = jwt.sign(
      {
        userId: result.rows[0].userid,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    // console.log(token);

    // Extract user data to return

    const username = result.rows[0].username;
    const userId = result.rows[0].userid;
    const first_name = result.rows[0].first_name;
    const last_name = result.rows[0].last_name;
    const avatar = result.rows[0].avatar;

    // console.log(result.rows[0]);

    res.status(200).json({
      user: {
        userId: userId,
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        image: avatar,
      },
      token: token,
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({
        error: "Duplicate key violation: User ID already exists",
      });
    } else {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // Get user ID from JWT token (set by auth middleware)
    const userId = req.user.userId;

    console.log("Attempting to delete user:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Check if user exists
    const userCheck = await db.query(
      "SELECT userid FROM users WHERE userid = $1",
      [userId]
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Delete user's posts first (if you have a posts table)
    try {
      await db.query("DELETE FROM posts WHERE user_id = $1", [userId]);
      // console.log("User posts deleted");
    } catch (error) {
      // console.log("No posts table or posts to delete");
    }

    // Delete user's comments (if you have a comments table)
    try {
      await db.query("DELETE FROM comments WHERE user_id = $1", [userId]);
      // console.log("User comments deleted");
    } catch (error) {
      // console.log("No comments table or comments to delete");
    }

    // Finally delete the user account
    const result = await db.query(
      "DELETE FROM users WHERE userid = $1 RETURNING userid, username, email",
      [userId]
    );

    if (result.rows.length > 0) {
      // console.log("User deleted successfully:", result.rows[0]);

      res.status(200).json({
        success: true,
        message: "Account deleted successfully",
        deletedUser: {
          userId: result.rows[0].userid,
          username: result.rows[0].username,
          email: result.rows[0].email,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Failed to delete user",
      });
    }
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while deleting account",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware

    // Handle the updateContent structure from frontend
    let updateData;
    let avatarData;

    if (req.body.updateContent) {
      updateData = req.body.updateContent;
    } else {
      updateData = req.body;
    }

    // Handle avatar update separately
    if (req.body.updateAvatar) {
      avatarData = req.body.updateAvatar;
    }

    const { first_name, last_name, email, password } = updateData;

    // Build the update query dynamically based on provided fields
    let updateFields = [];
    let values = [];
    let paramCount = 1;

    if (first_name) {
      updateFields.push(`first_name = $${paramCount}`);
      values.push(first_name);
      paramCount++;
    }

    if (last_name) {
      updateFields.push(`last_name = $${paramCount}`);
      values.push(last_name);
      paramCount++;
    }

    if (email) {
      updateFields.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateFields.push(`password = $${paramCount}`);
      values.push(hashedPassword);
      paramCount++;
    }

    // Add avatar if provided
    if (avatarData) {
      updateFields.push(`avatar = $${paramCount}`);
      values.push(avatarData);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        error: "No fields provided for update",
        success: false,
      });
    }

    // Add userId to values for WHERE clause
    values.push(userId);

    const query = `
      UPDATE users 
      SET ${updateFields.join(", ")} 
      WHERE userid = $${paramCount} 
      RETURNING userid, username, first_name, last_name, email, avatar
    `;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    const updatedUser = result.rows[0];

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: {
        id: updatedUser.userid,
        username: updatedUser.username,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({
        error: "Email already exists",
        success: false,
      });
    } else {
      console.error("Database error:", error);
      res.status(500).json({
        error: "Internal server error",
        success: false,
      });
    }
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware

    const result = await db.query(
      "SELECT userid, username, first_name, last_name, email, avatar FROM users WHERE userid = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    const user = result.rows[0];

    res.status(200).json({
      success: true,
      user: {
        userId: user.userid,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        image: user.avatar,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { newPost, newImage } = req.body;

    // if (!content) {
    //   return res.status(400).json({
    //     error: "Content is required",
    //     success: false,
    //   });
    // }

    const result = await db.query(
      "INSERT INTO post (post, post_img, post_time, likes, dislikes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [newPost, newImage, new Date(), 0, 0]
    );

    // const post_id = result.rows[0].post_id;
    const new_post = result.rows[0].newPost;
    const post_img = result.rows[0].newImage;
    const post_time = result.rows[0].post_time;
    const likes = result.rows[0].likes;
    const dislikes = result.rows[0].dislikes;

    // console.log(result);

    res.status(201).json({
      message: "Post created successfully",
      success: true,
      data: {
        // post_id: post_id,
        new_Post: new_post,
        post_img: post_img,
        post_time: post_time,
        likes: likes,
        dislikes: dislikes,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.postComment = async (req, res) => {};
