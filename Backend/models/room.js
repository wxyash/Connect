const mongoose = require('mongoose');
const ChatRoomSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  name: {
    type: 'String',
    required: true
  },
  time_created: {
    default: Date.now,
    type: Date
  },
  is_password_protected: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  user_list: [{
    type: String
  }]
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = {
  ChatRoom,
};