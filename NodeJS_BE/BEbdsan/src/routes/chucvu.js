const express = require('express');
const router = express.Router();

const chucvuController = require('../app/controllers/ChucVuController');
//const { verifyToken } = require('../middleware/authJwt');

//router.get('/:id', newsController.show);
// router.post('/create', loaigdController.create);
// router.delete('/:id', loaigdController.delete);

router.post('/create', chucvuController.create);
router.get('/', chucvuController.findAll);

module.exports = router;