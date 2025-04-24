const db = require("../db");

//Password-hashing functio
const bcrypt = require("bcrypt");

//To securely transfer information over the web
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//Controller for creating a user account
exports.signUp = async (req, res) => {
  try {
    console.log(req.body);

    const { username, first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword", hashedPassword);
    try {
      const result = await db.query(
        "INSERT INTO users (username, first_name, last_name, email, password)  VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, first_name, last_name, email, hashedPassword]
      );
      const username_data = result.rows[0].username;
      const firstName = result.rows[0].first_name;
      const lastName = result.rows[0].last_name;
      const email_data = result.rows[0].email;
      // const password = result.rows[0].password;
      const avatar = result.rows[0].avatar;
      res.status(201).json({
        message: "User created successfully",
        success: true,
        data: {
          username: username_data,
          first_name: firstName,
          last_name: lastName,
          email: email_data,
          // password:
          //   "$2b$10$PSmzo0gjn7jOuMf7m1UoQ.YeZCQhsTOB7.edKyMbCiJoO2QiCxu7q",
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
  try {
    console.log(req.body);

    const { email, password } = req.body;
    try {
      const result = await db.query(
        " SELECT  email, password	FROM users WHERE email = $1",
        [email]
      );
      console.log(result.rows[0]);
      const comparePassword = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      console.log("comparePassword", comparePassword);

      // const password = result.rows[0].password;
      // const avatar = result.rows[0].avatar;
      // res.status(201).json({
      //   message: "User created successfully",
      //   success: true,
      //   data: {
      //     username: username_data,
      //     first_name: firstName,
      //     last_name: lastName,
      //     email: email_data,
      //     // password:
      //     //   "$2b$10$PSmzo0gjn7jOuMf7m1UoQ.YeZCQhsTOB7.edKyMbCiJoO2QiCxu7q",
      //     avatar: null,
      //   },
      // });
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
