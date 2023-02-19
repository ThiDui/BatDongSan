const express = require('express');
const router = express.Router();

const lienheController = require('../app/controllers/LienheController');
//const { verifyToken } = require('../middleware/authJwt');

//router.get('/:id', newsController.show);
router.post('/create', lienheController.create);
router.delete('/:id', lienheController.delete);
router.put('/:id', lienheController.update);
router.get('/:id', lienheController.findOne);
router.get('/', lienheController.findAll);

module.exports = router;