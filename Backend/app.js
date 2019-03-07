var express = require('express');
var path = require('path');
const mongoose = require('./config/mongodb')
const cors = require('cors')
var app = express();
app.use(cors());

var userRoutes = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRoutes);

module.exports = app;
