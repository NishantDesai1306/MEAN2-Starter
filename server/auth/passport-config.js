var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/user/user.model');

exports.setupPassport = function(passport) {
    
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function (username, password, done) {
        process.nextTick(function () {
                
            var criteria = {
                $or: [
                    {
                        username: username
                    }, {
                        email: username
                    }
                ]
            };

            User.findOne(criteria, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username or password.'});
                }

                bcrypt.compare(password, user.password, function(err, isCorrectPassword) {
                    if(err) {
                        return done(null, false);
                    }
                    if(isCorrectPassword) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                });
            });
        });
    }));


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {
        
        var username = req.body.username;
        
        User.createUser(email, username, password)
        .then(function(user) {
            done(null, user);
        }, function(err) {
            done(err);
        });
    }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.getUserById(id)
        .then(function(user) {
            done(null, user);
        }, function(err) {
            done(err, null);
        });
    });
};