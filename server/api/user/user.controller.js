var User = require('./user.model');
var authController = require('../../auth/auth.controller');

exports.fetchUser = function(req, res) {
    res.json({
        status: true,
        username: req.user.username,
        email: req.user.email
    });
};

exports.changeDetails = function(req, res) {
    User.changeDetails(req.user._id, req.body)
        .then(function(newUser) {
            res.json({
                status: true,
                data: {
                    username: newUser.username,
                    email: newUser.email
                }
            });
        }, function(err) {
            res.json({
                status: false,
                reason: err.toString()
            });
        });
};

exports.changePassword = function(req, res) {
    User.changePassword(req.user, req.body.oldPassword, req.body.newPassword)
        .then(function() {
            res.json({
                status: true
            });
        }, function(err) {
            res.json({
                status: false,
                reason: err.toString()
            });
        });
};