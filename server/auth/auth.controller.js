var salt = require('../config').salt;
var bcrypt = require('bcrypt-nodejs');
var User = require('../api/user/user.model');

exports.successLogin = function(req, res) {
    res.json({ 
        status: true,
        data: {
            username: req.user.username,
            email: req.user.email,
            profilePicture: req.user.profilePicture.path
        }
    });
};

exports.successRegister = function(req, res) {
    res.json({ 
        status: true,
        data: {
            username: req.user.username,
            email: req.user.email,
            profilePicture: req.user.profilePicture.path
        }
    });
};

exports.logout = function(req, res) {
    req.logout();
    res.json({
        status: true
    });
};
