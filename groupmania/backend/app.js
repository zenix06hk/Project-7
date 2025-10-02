const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// const postsRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");

app.use(cors());

//'*' Allow any origin

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/api/posts", postsRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;
