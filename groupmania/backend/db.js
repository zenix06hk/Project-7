const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Zenix@2023",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "groupmania",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
