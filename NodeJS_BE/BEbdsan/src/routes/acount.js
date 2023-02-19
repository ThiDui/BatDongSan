const express = require('express');
const router = express.Router();

const acountController = require('../app/controllers/AcountController');

//router.get('/:id', newsController.show);
router.post('/create',acountController.create);
router.get('/user',acountController.findAllisUser);
router.get('/adminmoderator',acountController.findAllisAdminOrModerator);

router.delete('/:id',acountController.delete);

module.exports = router;