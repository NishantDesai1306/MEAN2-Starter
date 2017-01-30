var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');
// create a schema
var userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

userSchema.statics = {
    getUserById: function(userId) {
        var userDefer = Q.defer();

        this.findById(userId, function(err, user) {
            if(err) {
                return userDefer.reject(err);
            }
            if(!user) {
                return userDefer.reject(new Error('Invalid user-id '+userId+' passed'));
            }

            return userDefer.resolve(user);
        });

        return userDefer.promise;
    },
    isUserUnique: function(email, username, user) {
        var userDefer = Q.defer();
        var criteria = {
            $or: [
                {username: username},
                {email: email}
            ]
        };

        if(user) {
            criteria._id = {
                $ne: user._id ? user._id.toString() : user.toString()
            };
        }

        this.findOne(criteria, function(err, user) {
            if(err) {
                return userDefer.reject(err);
            }
            if(user) {
                var message = user.username === username ? 'Username' : 'Email';
                message += ' already exisits';

                return userDefer.reject(new Error(message));
            }

            return userDefer.resolve();
        });

        return userDefer.promise;
    },
    createUser: function(email, username, password) {
        var createUserDefer = Q.defer();
        var schema = this;

        this.isUserUnique(email, username)
        .then(function() {
            password = bcrypt.hashSync(password);
            var userModel = new schema({
                email: email,
                username: username,
                password: password
            });

            userModel.save(function(err) {
                if(err) {
                    return createUserDefer.reject(err);
                }
                createUserDefer.resolve(userModel);
            });
        }, function(err) {
            createUserDefer.reject(err);
        });

        return createUserDefer.promise;
    },
    changeDetails: function(userId, newDetails) {
        var self = this;
        var defer = Q.defer();

        this.isUserUnique(newDetails.email, newDetails.username, userId)
        .then(function() {
            return self.getUserById(userId);
        })
        .then(function(user) {
            user.email = newDetails.email;
            user.username = newDetails.username;
            user.save(function(err) {
                if(err) {
                    return defer.reject(err);
                }
                defer.resolve(user);
            });
        })
        .catch(function(err) {
            defer.reject(err);
        });

        return defer.promise;
    },
    changePassword: function(user, oldPassword, newPassword) {
        var self = this;
        var defer = Q.defer();

        this.getUserById(user._id || user)
        .then(function(user) {
            var oldPasswordValidation = Q.defer();

            if(bcrypt.compareSync(oldPassword, user.password)) {
                oldPasswordValidation.resolve(user);
            }
            else {
                oldPasswordValidation.reject(new Error('Old Password is invalid'));
            } 

            return oldPasswordValidation.promise;
        })
        .then(function(user) {
            var newPasswordHash = bcrypt.hashSync(newPassword);
            user.password = newPasswordHash;
            user.save(function(err) {
                if(err) {
                    return defer.reject(err);
                }
                return defer.resolve();
            });
        })
        .catch(function(err) {
            defer.reject(err);
        });

        return defer.promise;
    }
};

// the schema is useless so far we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
