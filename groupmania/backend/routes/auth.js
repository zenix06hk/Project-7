const express = require('express');
const router = express.Router();

const authCtrl = require('../controller/auth');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

router.post('/sign-up', authCtrl.signUp);
router.post('/login', authCtrl.login);
router.get('/login', authCtrl.login);
router.delete('/delete-account', auth, authCtrl.deleteAccount);
router.get('/user-profile', auth, authCtrl.getUserProfile);
router.put('/update-profile', auth, authCtrl.updateProfile);
router.post(
  '/update-profile-avatar',
  auth,
  multer,
  authCtrl.updateProfileAvatar
);

router.get('/test', authCtrl.test);

module.exports = router;
