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
      return badRequest('Error Registering Adming', {errors: errors}, res)
    }

  
    let existUser
    try {
      existUser = await Admin.findOne({email: req.body.email })
      if(existUser){
        return forbidden("Sorry, the email id is already taken, please try with a new one.", {}, res)
      }
    } catch (error) {
      return badRequest('Error Registering Admin', {error: error.message}, res)
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
      if (!savedUser) { return badRequest('Error saving Admin', {}, res) }
    } catch (error) {
      return badRequest('Cannot register Admin, error saving', { error: error.message }, res)
    }
    return success('User created, you may login.', {}, res)
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

    passport.authenticate('local', (err, user, info) => {
      var token;
      if(err){
        return notFound('Admin Not Found', {error: err.message}, res);
      }

      if(!user){
        return unauthorized("The Account is unauthorized", {error: info}, res);
      }else{
        console.log("HEY")

        // token = Admins.generateJwt()
        // success('Account authorized', {'token': token}, res)
      }
    })(req, res)
  }


  let findByEmail = async function(req, res) {
    let email = req.body.email
    let admin
    try {
      admin = await Admin.findOne({email: email})
      console.log(admin)
      if(!admin){
        return badRequest('error finding admin', {}, res)
      }
    } catch (error) {
      return badRequest('cannot find admin', {error: error.message}, res)
    }
    success('found admin', {admin: admin}, res)
  }
 
module.exports ={
  Register,
  Login,
  findByEmail
}