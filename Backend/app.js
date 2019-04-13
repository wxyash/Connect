var express = require('express');
var path = require('path');
const mongoose = require('./config/mongodb')
const cors = require('cors')
const passport = require('passport')
var app = express();
app.use(cors());

require('./models/user');
require('./config/passport');

var userRoutes = require('./routes/user');
var roomRoutes = require('./routes/rooms');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());


app.use('/user', userRoutes);
app.use('/room', roomRoutes);

module.exports = app;
