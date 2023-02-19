const express = require('express');
const router = express.Router();

const loaibdsController = require('../app/controllers/LoaibdsController');
//const { verifyToken } = require('../middleware/authJwt');

//router.get('/:id', newsController.show);
router.post('/create', loaibdsController.create);
router.delete('/:id', loaibdsController.delete);
router.put('/:id', loaibdsController.update);
router.get('/:id', loaibdsController.findOne);
router.get('/', loaibdsController.findAll);

module.exports = router;