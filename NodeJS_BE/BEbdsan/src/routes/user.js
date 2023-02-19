const express = require('express');
const router = express.Router();
const {verifyToken}= require('../middleware/authJwt')
const userController = require('../app/controllers/UserController.js');

//router.get('/:id', newsController.show);
// /user/   
router.patch('/update/password', verifyToken, userController.changePassword);
router.put('/:id', userController.update);
router.get('/profile', verifyToken,userController.findOne); 
router.get('/', userController.findAll);


module.exports = router;