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

    try {
      const result = await db.query(
        "INSERT INTO users (username, first_name, last_name, email, password)  VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, first_name, last_name, email, password]
      );
      res.status(201).json({
        message: "User created successfully",
        success: true,
        data: result.rows[0],
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
    // bcrypt
    //   .hash(req.body.password, saltRounds)
    //   .then((hash) => {
    //     const newUser = new userModel({
    //       email: req.body.email,
    //       password: hash,
    //     });
    //     newUser
    //       .save() //save the user to the database
    //       .then(() => {
    //         res.status(200).json({ message: "Sign up successful." });
    //       })
    //       .catch((error) => {
    //         res
    //           .status(500)
    //           .json({ message: "Email has been sign up.", error: error });
    //       });
    //   })
    //   .catch((error) => {
    //     res.status(500).json({ error: error });
    //   });
    return;

    db.query(
      "INSERT INTO users (username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, first_name, last_name, email, password],
      (error, results) => {
        if (error) {
          throw error;
          // res.status(403).send("User already exists");
          // return;
        }
        res
          .status(200)
          // .send(`User added with ID: ${results.rows[0].id}`)
          .json({
            message: "Email has been sign up.",
            success: true,
            data: results.rows[0],
          });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
