const db = require("../db");

//Controller for creating a user account
exports.signUp = async (req, res) => {
  try {
    console.log(req.body);

    const { username, first_name, last_name, email, password } = req.body;

    db.query(
      "INSERT INTO users (username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, first_name, last_name, email, password],
      (error, results) => {
        if (error) {
          res.status(403).send("User already exists");
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
    // const result = await db.query("SELECT * FROM public.users");
    // res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
