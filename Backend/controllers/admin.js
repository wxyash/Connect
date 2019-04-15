const { io } = require('../bin/www')
const { Admin } = require('../models/admin')
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

  

  module.exports = {
      Register,
  }