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
        "INSERT INTO users (username, first_name, last_name, email, password)  VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, first_name, last_name, email, hashedPassword]
      );
      const username_data = result.rows[0].username;
      const firstName = result.rows[0].first_name;
      const lastName = result.rows[0].last_name;
      const email_data = result.rows[0].email;
      const password = result.rows[0].password;
      const avatar = result.rows[0].avatar;
      res.status(201).json({
        message: "User created successfully",
        success: true,
        data: {
          username: username_data,
          first_name: firstName,
          last_name: lastName,
          email: email_data,

          avatar: null,
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

  console.log(req.body);

  try {
    const result = await db.query(
      "SELECT email, username, first_name, userid, password FROM users WHERE email = $1",
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
        // userName: result.rows[0].username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    // console.log(token);

    const username = result.rows[0].username;
    const userId = result.rows[0].userid;
    const first_name = result.rows[0].first_name;

    res.status(200).json({
      user: {
        userId: userId,
        username: username,
        name: first_name,
        email: email,
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

  // if (result.rows.length === 0) {
  //   return res.status(404).json({ error: "Invalid email or password" });
  // }

  // const user = result.rows[0];
  // const isPasswordMatch = await bcrypt.compare(password, user.password);

  // if (!isPasswordMatch) {
  //   return res.status(401).json({ error: "Password does not match" });
  // }

  // return res.status(200).json({
  //   success: true,
  //   message: "Login successful",
  // });
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
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send("Internal Server Error");
  // }
};
