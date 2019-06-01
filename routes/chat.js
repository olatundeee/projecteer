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
      // store group chat data in database

      GroupChat.create(chatData, function(err, chat) {
        // get newly created message from database and emit to client

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

    // store private chats in database

    socket.on('sendPrivateMessage', function(message) {
      UserChat.create(message, function(err, onemessage) {
        // get newly created message from database and emit to client

        io.emit('displayNewPrivateMessage', onemessage);
      })
    });

    // get all private messages for two particular users

    socket.on('displayPrivateMessages', function(chatParam) {
      // get all private chat from the database

      UserChat.find({}, function(err, chats) {
        chats.forEach(chat => {
          const allchats = [];

          // get private chats for appropriate users

          if ((chat.senderId === chatParam.senderId || chat.senderId === chatParam.recipientId) && (chat.recipientId === chatParam.senderId || chat.recipientId === chatParam.recipientId )) {
            allchats.push(chat)
          }
          

          // emit private messages to client
          console.log(allchats);
          socket.emit('onDisplayPrivateMessages', allchats);
        })
      })
    })
  });

  http.listen(4444);



module.exports = router;