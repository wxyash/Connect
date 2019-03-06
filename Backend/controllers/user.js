const { io } = require('../bin/www')
const { User } = require('../models/user')
const _ = require('lodash')
const { badRequest, success } = require('../utils/responseHandler')

let Register = async function (req, res) {
  let errors = {};
  let reqFields = ['first_name', 'last_name', 'email', 'password'];
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    };
  });

  let data = _.pick(req.body, reqFields)

  let newUser
  try {
    newUser = await new User(data)
    if (!newUser) { badRequest('Error creating user', {}, res) }
  } catch (error) {
    badRequest('Cannot register user, error creating', { error: error.message }, res)
  }

  let savedUser
  try {
    savedUser = newUser.save()
    if (!savedUser) { return badRequest('Error saving user', {}, res) }
    return success('User created, you may login.'. { user: savedUser }, res)
  } catch (error) {
    return badRequest('Cannot register user, error saving', { error: error.message }, res)
  }
}

let Login = async function (req, res) {
  let errors = {};
  let reqFields = ['email', 'password'];
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    };
  });

  let data = _.pick(req.body, reqFields)

  let user
  try {
    newUser = await User.find({ email: data.email })
    if (!newUser) { return badRequest('User not found', {}, res) }
  } catch (error) {
    return badRequest('Cannot find the user', { error: error.message }, res)
  }

  if (user.password === data.password) {
    io.emit('user_connect', user._id)
    return success('Login Successful', { user: user }, res)
  } else {
    return badRequest('Incorrect username or password', {}, res)
  }
}

module.exports = {
  Login,
  Register
}
