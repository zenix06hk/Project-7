const express = require("express");
const router = express.Router();

const authCtrl = require("../controller/auth");
const auth = require("../middleware/auth");

router.post("/sign-up", authCtrl.signUp);
router.post("/login", authCtrl.login);
router.delete("/delete-account", auth, authCtrl.deleteAccount);

router.get("/user-profile", auth, authCtrl.getUserProfile);
router.put("/update-profile", auth, authCtrl.updateProfile);
// router.get("/update-profile", authCtrl.updateProfile);
// router.get("/:id", authCtrl.post);
// router.post("/:id", authCtrl.post);
// router.put("/:id", authCtrl.post);
// router.delete("/:id", authCtrl.post);

// router.get("/:id", authCtrl.comment);
// router.post("/:id", authCtrl.comment);
// router.put("/:id", authCtrl.comment);
// router.delete("/:id", authCtrl.comment);

// router.post("/:id/like", authCtrl.likePost);

router.get("/test", authCtrl.test);

module.exports = router;
