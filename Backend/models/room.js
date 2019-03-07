const mongoose = require('mongoose');
const ChatRoomSchema = mongoose.Schema({
  time_created: {
    default: Date.now,
    type: Date
  },
  room_size: {
    type: Number,
    required: true
  },
  is_password_protected: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  user_list: [{
    type: mongoose.Schema.ObjectId
  }]
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = {
  ChatRoom,
};