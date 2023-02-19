const express = require('express');
const router = express.Router();

const loaittController = require('../app/controllers/LoaittController');
//const { verifyToken } = require('../middleware/authJwt');

//router.get('/:id', newsController.show);
router.post('/create',loaittController.create);
router.delete('/:id',loaittController.delete);
router.put('/:id',loaittController.update);
router.get('/:id', loaittController.findOne);
router.get('/',loaittController.findAll);

module.exports = router;