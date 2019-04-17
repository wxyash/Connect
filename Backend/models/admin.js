const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const keys = require ('../config/keys');

const AdminSchema = mongoose.Schema({
  time_created: {
    type: Date,
    default: Date.now
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
      type: String
   }
});

AdminSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex')
    return this.save();
  }
  
AdminSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
    console.log(this.hash === hash)
    return this.hash === hash;
  }
  
  // Private and public keys need to be added
AdminSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7)
    return jwt.sign({
      _id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      exp: parseInt(expiry.getTime() / 1000)
    }, keys.privateKey)
  }

  
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = {
  Admin,
};