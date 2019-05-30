var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var GroupChat = require('../models/group-chat.js');
var UserChat = require('../models/user-chat.js');

// create socket server and connect to main server

io.on("connection", socket => {
    console.log('socket connected')

    socket.on('sendGroupMessage', function(chatData) {
      // store chat data in database

      GroupChat.create(chatData, function(err, chat) {
        GroupChat.findOne({
          _id: chat._id
        }, function(err, onechat) {
          // emit to sender socket
          io.emit('displayFoundMessage', onechat);
        })
      })
    })

    // display messages for a particular project chat

    socket.on('displayGroupMessages', function(projectId) {
      GroupChat.find({
        projectId: projectId
      }, function(err, chats) {
        socket.emit('displayFoundMessages', chats);
      })
    })

    // broadcast message to other members of the group chat

    socket.on('broadcastMessage', function(data) {
      console.log(data);
    })
  });

  http.listen(4444);



module.exports = router;