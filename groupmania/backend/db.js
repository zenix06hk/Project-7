const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.PORT_DB, // default Postgres port
  database: process.env.DATABASE_NAME,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
