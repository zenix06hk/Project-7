const express = require("express");
const router = express.Router();

const authCtrl = require("../controller/auth");

router.get("/sign-up", authCtrl.signUp);
// router.post("/login", authCtrl.login);

module.exports = router;
