const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER_NAME,
  password: "Zenix@2023",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "groupmania",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
