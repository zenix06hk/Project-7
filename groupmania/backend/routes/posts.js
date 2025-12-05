const express = require('express');
const router = express.Router();

const postCtrl = require('../controller/posts');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

//Import handling files upload
// const multer = require("../middleware/multer-config");

router.post('/create-post', auth, postCtrl.createPost);
router.get('/get-posts', auth, postCtrl.getPosts);

//Export and exploitation of routes
module.exports = router;
