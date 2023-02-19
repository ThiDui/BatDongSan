const express = require('express');
const router = express.Router();

const yeucaulhController = require('../app/controllers/YeuCauLhController');
const { verifyToken } = require('../middleware/authJwt');


router.post('/create',verifyToken,yeucaulhController.create);
router.get('/user',verifyToken, yeucaulhController.findUserLH);
router.get('/find/:idbds/',verifyToken, yeucaulhController.findOne);
router.get('/',yeucaulhController.findAll);

module.exports = router;