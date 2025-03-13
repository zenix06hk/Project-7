const express = require("express");

//Routes declare
const router = express.Router();

//Import handling files upload
// const multer = require("../middleware/multer-config");

//Import sauce controller
// const saucesCtrl = require("../controller/sauces");

//Adding controllers to routes (including authentication middleware and file management)
// router.get("/", auth, saucesCtrl.saucesList);
// router.post("/", auth, multer, saucesCtrl.saucesSave);
// router.get("/:id", auth, saucesCtrl.saucesListId);
// router.put("/:id", auth, multer, saucesCtrl.saucesListUpdate);
// router.delete("/:id", auth, saucesCtrl.saucesDelete);
// router.post("/:id/like", auth, saucesCtrl.saucesListLike);

//Export and exploitation of routes
module.exports = router;
