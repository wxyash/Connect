const mongoose = require('mongoose');
const ConnectionHistorySchema = mongoose.Schema({
  connection_type: {
    type: String,
    enum: ['socket_join',' socket_leave', 'user_join', 'user_leave'],
    required:true
  },
  time_created: {
    default: Date.now()
  },
  socket_id: {
    type: 'String',
    required:true
  },
  room_id: {
    required: true,
    type: mongoose.Schema.ObjectId
  },
  user_id: {
    required:true,
    type: mongoose.Schema.ObjectId
  }

});

const ConnectionHistory = mongoose.model('ConnectionHistory', ConnectionHistorySchema);
module.exports = {
    ConnectionHistory,
};