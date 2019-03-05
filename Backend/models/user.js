const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  time_created: {
    default: Date.now()
  },
  first_name: {
    type: Number,
    required: true
  },
  last_name: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = {
  User,
};