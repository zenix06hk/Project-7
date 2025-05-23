const express = require("express");
const router = express.Router();

const authCtrl = require("../controller/auth");
const auth = require("../middleware/auth");

router.post("/sign-up", authCtrl.signUp);
router.post("/login", authCtrl.login);
router.get("/test", auth, authCtrl.test);

module.exports = router;
