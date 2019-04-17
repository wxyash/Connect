const { io } = require('../bin/www')
const { Admin } = require('../models/admin')
const _ = require('lodash')
const { badRequest, success, forbidden, notFound, unauthorized } = require('../utils/responseHandler')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const keys = require ('../config/keys');

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
      existUser = await Admin.findOne({email: req.body.email })
      if(existUser){
        return forbidden("Sorry, the email id is already taken, please try with a new one.", {}, res)
      }
    } catch (error) {
      return badRequest('Error Registering user', {error: error.message}, res)
    }
  
    let data = _.pick(req.body, reqFields)
    let newUser
    try {
      newUser = await new Admin(data)
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
      console.log(savedUser)
      if (!savedUser) { return badRequest('Error saving user', {}, res) }
    } catch (error) {
      return badRequest('Cannot register user, error saving', { error: error.message }, res)
    }
    return success('User created, you may login.', {admin: savedUser}, res)
  }

  let Login = function(req, res) {
    let errors ={}
    let reqFields = ['email', 'password'];
    reqFields.forEach(function(field){
      if(!req.body[field] || req.body.field === ''){
        errors[field] = `${field.replace(/_/g, ' ')} is required`;
      };
    })
    if(Object.keys(errors).length){
      return badRequest('Error Login Admin', {errors: errors}, res)
    }

    passport.authenticate('local', (err, admin, info) => {
      var token;
      if(err){
        return notFound('Admin Not Found', {error: err.message}, res);
      }

      if(!admin){
        return unauthorized("The Account is unauthorized", {error: info}, res);
      }else{
        token = admin.generateJwt()
        success('Account authorized', {'token': token}, res)
      }
    })(req, res)
  }

  let verifyToken = async function(req, res) {
    var token = req.headers['authorization'].split(' ')[1];
    if(!token){
      unauthorized('Access Denied', {auth: false}, res);
    }

    let decoded
    try {
      console.log('bhsodkika')
      decoded = await jwt.verify(token, keys.privateKey)
      console.log(decoded)
       if (!decoded) return badRequest('token verification failed', {}, res)
    } catch (error) {
      console.log(error.message)
      return badRequest('token verification failed', {error: error.message}, res)
    }

    let admin
    try {
      admin = await Admin.findById(decoded._id)
      if (!admin) return badRequest('admin not found', {}, res)
    } catch (error) {
      if (!decoded) return badRequest('admin not found', {error: error.message}, res)      
    }

    return success('admin verification succesfull', admin, res)

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
      Register,
      Login,
      findByEmail,
      verifyToken
  }