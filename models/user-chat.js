var mongoose = require('mongoose');

var UserChatSchema = new mongoose.Schema({
  recipient: String,
  recipientId: String,
  message: String,
  sender: String,
  senderId: String,
  unique_chat_id_1: {
    senderId: String,
    recipientId: String
  }
});

module.exports = mongoose.model('UserChat', UserChatSchema);