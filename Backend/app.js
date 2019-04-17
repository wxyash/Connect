var express = require('express');
var path = require('path');
const mongoose = require('./config/mongodb')
const cors = require('cors')
const passport = require('passport')
var app = express();
app.use(cors());

require('./models/admin')
require('./config/passport');

var userRoutes = require('./routes/user');
var roomRoutes = require('./routes/rooms');
var adminRoutes = require('./routes/admin');
var historyRoutes = require('./routes/history');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());


app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/admin', adminRoutes)
app.use('/history', historyRoutes);
module.exports = app;
