const express = require('express');
const router = express.Router();

const tinbdsController = require('../app/controllers/TinbdsController');

const imgController = require('../app/controllers/HinhBDS');
const {isExistentAddress} = require('../middleware/checkAdress')

const { verifyToken } = require('../middleware/authJwt');
router.post('/create',imgController.upload.array('HA_DuongDan',4),tinbdsController.create);
router.post('/createus',imgController.upload.array('HA_DuongDan',4),isExistentAddress,tinbdsController.createUs);
router.get('/text', tinbdsController.TinUserAll);
router.get('/hethan', tinbdsController.TinHetHan);
router.get('/notapproved', tinbdsController.findAllNotApproved);

router.get('/user/approved', verifyToken,tinbdsController.TinUserApproved);
router.get('/user/notapproved', verifyToken,tinbdsController.TinUserNotApproved);
router.get('/user/tinhethan', verifyToken,tinbdsController.UserTinHetHan);


router.get('/gioihan/:idgd', tinbdsController.TinGioiHan);
router.get('/show/:id', tinbdsController.showUD);
router.get('/:idgd/:idbds', tinbdsController.LoaiTin);
router.delete('/:id', tinbdsController.delete);

router.get('/:id', tinbdsController.show);
router.put('/:id', tinbdsController.update);

router.get('/', tinbdsController.findAll);

module.exports = router;
