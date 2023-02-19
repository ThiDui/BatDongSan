const express = require('express');
const router = express.Router();
const {isExistentEmailOrUserName} = require('../middleware/verifySignUp')
const authController = require('../app/controllers/AuthController');
const imgController = require('../app/controllers/HinhBDS');

//router.get('/:id', newsController.show);
router.post('/login', authController.login);
router.post('/signuptest',imgController.upload.single('avatar'),isExistentEmailOrUserName, authController.signuptest);
router.post('/signup',isExistentEmailOrUserName, authController.signup);
//router.post('/logout', authController.logout);

module.exports = router;