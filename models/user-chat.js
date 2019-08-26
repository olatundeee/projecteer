var mongoose = require('mongoose');

var UserChatSchema = new mongoose.Schema({
  conversationId: String,
  sender: String,
  recipient: String,
  message: String,
  created_At: Date
});

module.exports = mongoose.model('UserChat', UserChatSchema);