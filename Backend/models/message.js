const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
  time_created: {
    default: Date.now,
    type: Date
  },
  sender: {
    type: String,
    required: true
  },
  recieiver: {
    type: [String]
  },
  room: {
    required: true,
    type: String
  },
  message: {
    required: true,
    type: String
  }
});

const Message = mongoose.model('MessageHistory', MessageSchema);
module.exports = {
  Message,
};