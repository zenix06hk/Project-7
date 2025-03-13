const db = require("../db");

//Controller for creating a user account
exports.signUp = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
