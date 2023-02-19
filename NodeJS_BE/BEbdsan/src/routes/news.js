const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

//router.get('/:id', newsController.show);
router.post('/create', newsController.create);
router.delete('/:id', newsController.delete);
router.put('/:id', newsController.update);
router.get('/:id', newsController.findOne);
router.get('/',newsController.findAll);


module.exports = router;