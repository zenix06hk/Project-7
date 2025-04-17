// import nc from "next-connect";
// import db from "../../lib/db";

// const handler = nc()
//   .get(async (req, res) => {
//     try {
//       const result = await db.query("SELECT * FROM items");
//       res.json(result.rows);
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   })
//   .post(async (req, res) => {
//     const { name, description } = req.body;
//     try {
//       const result = await db.query(
//         "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
//         [name, description]
//       );
//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

// export default handler;
