const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const keys = require ('../config/keys');

const UserSchema = mongoose.Schema({
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

UserSchema.methods.setPassword = async function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex')
  console.log(this.hash)
  return this.save();
}

UserSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
  console.log(hash)
  return this.hash === hash;
}

// Private and public keys need to be added
UserSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7)
  return jwt.sign({
    _id: this._id,
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    exp: parseInt(expiry.getTime / 1000)
  }, keys.privateKey)
}



const User = mongoose.model('User', UserSchema);
module.exports = {
  User,
};