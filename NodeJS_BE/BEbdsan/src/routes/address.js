const express = require('express');
const router = express.Router();

const addressController = require('../app/controllers/AddressController');
//const { verifyToken } = require('../middleware/authJwt');



router.get('/tinhthanh', addressController.findAll);
router.get('/quanhuyen', addressController.findAllQh);
router.get('/xaphuong', addressController.findAllXp);

module.exports = router;