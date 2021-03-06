var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('./passport-config');
var controller = require('./auth.controller');

passportConfig.setupPassport(passport);

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } 
    else {
        next(new Error('Unauthorized'));
    }
};
exports.isAuthenticated = isAuthenticated;


router.post('/login', passport.authenticate('local'), controller.checkRememberMe, controller.successLogin);
router.post('/register', passport.authenticate('local-signup'), controller.successRegister);
router.post('/logout', isAuthenticated, controller.logout);


exports.router = router;