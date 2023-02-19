const express = require('express');
const router = express.Router();

const thongkeController = require('../app/controllers/thongkeController');

// router.post('/create', thongkeController.create);
router.get('/tintheothang',thongkeController.countTinThang);
router.get('/tinloaitheothang',thongkeController.countTinLoaiThue);
router.get('/tongtin',thongkeController.countTin);
router.get('/tonguser',thongkeController.CountUser);
router.get('/tinloaitheothangmua',thongkeController.countTinLoaiMua);

module.exports = router;