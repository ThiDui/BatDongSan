const express = require('express');
const router = express.Router();

const phaplyController = require('../app/controllers/TinhtrangPlController');

router.post('/create', phaplyController.create);
router.get('/',phaplyController.findAll);

module.exports = router;