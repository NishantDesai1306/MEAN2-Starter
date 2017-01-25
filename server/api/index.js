var express = require('express');
var app = express();

app.use('/user', require('./user'));

module.exports = app;