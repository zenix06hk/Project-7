const express = require("express");
const router = express.Router();

const authCtrl = require("../controller/auth");
const auth = require("../middleware/auth");

router.post("/sign-up", authCtrl.signUp);
router.post("/login", authCtrl.login);

router.get("/:id", authCtrl.post);
router.post("/:id", authCtrl.post);
router.put("/:id", authCtrl.post);
router.delete("/:id", authCtrl.post);

router.get("/:id", authCtrl.comment);
router.post("/:id", authCtrl.comment);
router.put("/:id", authCtrl.comment);
router.delete("/:id", authCtrl.comment);

router.post("/:id/like", authCtrl.likePost);

router.get("/test", auth, authCtrl.test);

module.exports = router;
