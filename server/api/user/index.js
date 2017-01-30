var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/details', controller.fetchUser);
router.post('/change-details', controller.changeDetails);
router.post('/change-password', controller.changePassword);
module.exports = router;