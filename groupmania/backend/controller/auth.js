const db = require('../db');

//Password-hashing function
const bcrypt = require('bcrypt');

//To securely transfer information over the web
const jwt = require('jsonwebtoken');
const saltRounds = 10;
exports.test = async (req, res) => {
  res.status(201).json({
    message: 'test successfully',
    success: true,
  });
};
//Controller for creating a user account
exports.signUp = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log("hashedPassword", hashedPassword);
    try {
      const result = await db.query(
        'INSERT INTO users (username, first_name, last_name, email, password, avatar)  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          username,
          first_name,
          last_name,
          email,
          hashedPassword,
          '/assets/annoymous_avatar.avif.jpg',
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
        message: 'User created successfully',
        success: true,
        data: {
          username: username_data,
          first_name: firstName,
          last_name: lastName,
          email: email_data,
          avatar: '/assets/annoymous_avatar.avif.jpg',
        },
      });
    } catch (error) {
      if (error.code === '23505') {
        res.status(409).json({
          error: 'Duplicate key violation: User ID already exists',
        });
      } else {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      'SELECT email, username, avatar, first_name, last_name, user_id, password FROM users WHERE email = $1',
      [email]
    );
    // console.log(result?.rows?.length);
    console.log(result.rows.length, 'hit here 2nd time!');
    console.log(result?.rows?.length !== 1, 'hit here 3rd time!');
    if (result?.rows?.length !== 1) {
      console.log('hit here 4th time');
      return res.status(401).json({
        error: 'User not found 12354567890!',
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
        error: 'Password incorrect!',
      });
    }

    console.log(result.rows[0], 'hit here!');

    //Creation of the authentication token
    const token = jwt.sign(
      {
        user_id: result.rows[0].user_id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
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
        user_Id: userId,
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        image: avatar,
      },
      token: token,
    });
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({
        error: 'Duplicate key violation: User ID already exists',
      });
    } else {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // Get user ID from JWT token (set by auth middleware)
    const userId = req.user.userId;

    console.log('Attempting to delete user:', userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required',
      });
    }

    // Check if user exists
    const userCheck = await db.query(
      'SELECT user_id FROM users WHERE user_id = $1',
      [userId]
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found 1',
      });
    }

    // Delete user's posts first (if you have a posts table)
    try {
      await db.query('DELETE FROM posts WHERE user_id = $1', [userId]);
      // console.log("User posts deleted");
    } catch (error) {
      // console.log("No posts table or posts to delete");
    }

    // Delete user's comments (if you have a comments table)
    try {
      await db.query('DELETE FROM comments WHERE user_id = $1', [userId]);
      // console.log("User comments deleted");
    } catch (error) {
      // console.log("No comments table or comments to delete");
    }

    // Finally delete the user account
    const result = await db.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING user_id, username, email',
      [userId]
    );

    if (result.rows.length > 0) {
      // console.log("User deleted successfully:", result.rows[0]);

      res.status(200).json({
        success: true,
        message: 'Account deleted successfully',
        deletedUser: {
          user_Id: result.rows[0].user_id,
          username: result.rows[0].username,
          email: result.rows[0].email,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Failed to delete user',
      });
    }
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error while deleting account',
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware
    const updates = req.body.updateContent;

    console.log('Updates received:', updates); // Debug log
    console.log('User ID:', userId); // Debug log

    // Handle password update separately
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, saltRounds);

      const passwordQuery = `
        UPDATE users
        SET password = $1
        WHERE user_id = $2
        RETURNING user_id, username, first_name, last_name, email, avatar
      `;

      const result = await db.query(passwordQuery, [hashedPassword, userId]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'User not found 2',
          success: false,
        });
      }

      return res.status(200).json({
        message: 'Password updated successfully',
        success: true,
      });
    }

    // Handle profile information update (email, firstName, lastName)
    // Check if required fields are present
    if (!updates.email || !updates.firstName || !updates.lastName) {
      return res.status(400).json({
        error:
          'Email, firstName, and lastName are required for profile updates',
        success: false,
      });
    }

    const values = [updates.email, updates.firstName, updates.lastName, userId];

    const query = `
      UPDATE users
      SET email = $1, first_name = $2, last_name = $3
      WHERE user_id = $4
      RETURNING user_id, username, first_name, last_name, email, avatar
    `;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found 3',
        success: false,
      });
    }

    const updatedUser = result.rows[0];

    res.status(200).json({
      message: 'Profile updated successfully',
      success: true,
      data: {
        id: updatedUser.user_id,
        username: updatedUser.username,
        firstName: updatedUser.first_name ?? '',
        lastName: updatedUser.last_name ?? '',
        email: updatedUser.email,
        avatar: updatedUser.avatar ?? '',
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({
        error: 'Email already exists',
        success: false,
      });
    } else {
      console.error('Database error:', error);
      res.status(500).json({
        error: 'Internal server error',
        success: false,
      });
    }
  }
};

exports.updateProfileAvatar = async (req, res) => {
  try {
    const userId = req.user.user_id; // From auth middleware

    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        success: false,
      });
    }

    const avatarUrl = `${req.file.filename}`;
    console.log('New avatar URL:', avatarUrl);

    // Update user avatar in database
    const query = `
      UPDATE users
      SET avatar = $1
      WHERE user_id = $2
      RETURNING user_id, username, first_name, last_name, email, avatar
    `;

    const result = await db.query(query, [avatarUrl, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found 4',
        success: false,
      });
    }

    const updatedUser = result.rows[0];

    res.status(200).json({
      message: 'Avatar updated successfully',
      success: true,
      avatar: updatedUser.avatar, // Return the new avatar URL
    });
  } catch (error) {
    console.error('Avatar update error:', error);
    res.status(500).json({
      error: 'Avatar failed to upload',
      success: false,
    });
  }
};

exports.cleanupAvatars = async (req, res) => {
  try {
    // Reset malformed avatar filenames to null
    const query = `
      UPDATE users 
      SET avatar = NULL 
      WHERE avatar LIKE '%.jpg%.jpg%' 
         OR avatar LIKE '%.png%.png%' 
         OR LENGTH(avatar) > 100
    `;

    const result = await db.query(query);

    res.status(200).json({
      message: `Cleaned up ${result.rowCount} malformed avatars`,
      success: true,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      error: 'Failed to cleanup avatars',
      success: false,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id; // From auth middleware

    console.log(user_id);
    // console.log('Fetching profile for user ID:', user_id);

    const result = await db.query(
      'SELECT user_id, username, first_name, last_name, email, avatar FROM users WHERE user_id = $1',
      [user_id]
    );

    // console.log('Database query result:', result);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found 5',
        success: false,
      });
    }

    const user = result.rows[0];
    console.log(('user profile fetched:', user));

    res.status(200).json({
      success: true,
      user: {
        user_id: user.user_id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        image: user.avatar,
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
