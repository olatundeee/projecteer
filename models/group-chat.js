var mongoose = require('mongoose');

var GroupChatSchema = new mongoose.Schema({
  projectName: String,
  projectId: String,
  message: String,
  currentUserId: String,
  currentUser: String
});

module.exports = mongoose.model('GroupChat', GroupChatSchema);