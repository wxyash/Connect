const { io } = require('../bin/www')
const { User } = require('../models/user')
const _ = require('lodash')
const { badRequest, success, forbidden, notFound, unauthorized } = require('../utils/responseHandler')
const passport = require('passport')

let Register = async function (req, res) {
  let errors = {};
  let reqFields = ['first_name', 'last_name', 'email', 'password'];
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    };
  });

  if (Object.keys(errors).length) {
    return badRequest("Error registering user", {error: errors.message}, res)
  }

  let existUser
  try {
    existUser = await User.findOne({email: req.body.email })
    if(existUser){
      return forbidden("Sorry, the email id is already taken, please try with a new one.", {}, res)
    }
  } catch (error) {
    return badRequest('Error Registering user', {error: error.message}, res)
  }

  let data = _.pick(req.body, reqFields)
  let newUser
  try {
    newUser = await new User(data)
    if (!newUser) { return badRequest('Error creating user', {}, res) }
  } catch (error) {
    return badRequest('Cannot register user, error creating', { error: error.message }, res)
  }

  let jwt 
  try {
    jwt = await newUser.generateJwt()
    if(!jwt){
      return badRequest('Error Generating Jwt', {}, res)
    }
  } catch (error) {
    return badRequest('Error Generating JWT', {error: error.message}, res)
  }
  let savedUser
  try {
    savedUser = await newUser.setPassword(req.body.password)
    if (!savedUser) { return badRequest('Error saving user', {}, res) }
  } catch (error) {
    return badRequest('Cannot register user, error saving', { error: error.message }, res)
  }
  return success('User created, you may login.', {}, res)
}

let Login = function (req, res) {
  let errors = {};
  let reqFields = ['email', 'password'];
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    };
  });
  if (Object.keys(errors).length) {
    return badRequest("Error login user", {error: errors.message}, res)
  }
  // Ask Yash if this is importent -->  io.emit('user_connect', user._id)
  passport.authenticate('local', (err, user, info)=>{
    console.log("hola")
    var token;
    // if Passport throw/catches an error
    if(err){
      return notFound('User Not Found', {error: err.message}, res)
    }

    if(!user){
      // If Not User
      return unauthorized("The Account is unauthorized to access", {error: info}, res)
    }
    token = user.generateJwt()
    success('Account authorized' ,{'token': token}, res)
  })(req, res)
}

let findByEmail = async function (req, res) {
  console.log(req.body)
  let email = req.body.email
  let user
  try {
    user = await User.find({ email: email })
    console.log(user)
    if (!user) {
      return badRequest(`Cannot find user`, {}, res)
    }
  } catch (error) {
    return badRequest(`Cannot find user, Error: ${error.message}`, {}, res)
  }
  success('User', user, res)
}

module.exports = {
  Login,
  Register,
  findByEmail
}
