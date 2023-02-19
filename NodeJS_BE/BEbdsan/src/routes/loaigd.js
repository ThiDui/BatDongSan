const express = require('express');
const router = express.Router();

const loaigdController = require('../app/controllers/LoaigdController');
//const { verifyToken } = require('../middleware/authJwt');

//router.get('/:id', newsController.show);
router.post('/create', loaigdController.create);
router.delete('/:id', loaigdController.delete);
router.put('/:id', loaigdController.update);
router.get('/', loaigdController.findAll);

module.exports = router;