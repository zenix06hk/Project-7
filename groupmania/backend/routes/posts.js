const express = require('express');
const router = express.Router();

const postCtrl = require('../controller/posts');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

//Import handling files upload
// const multer = require("../middleware/multer-config");

router.post('/create-post', auth, multer, postCtrl.createPost);
router.get('/get-posts', auth, postCtrl.getPosts);
router.post('/create-comment', auth, postCtrl.createComment);
router.post('/create-popularity', auth, postCtrl.createPopularity);

//Export and exploitation of routes
module.exports = router;
