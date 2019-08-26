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
        const date = Date.now();
        const participant_one = message.participant_one;
        const participant_one_username = message.participant_one_username;
        const participant_two = message.participant_two;
        const participant_two_username = message.participant_two_username;

        UserChat.create({
          conversationId: participant_one + participant_two,
          sender: participant_one_username,
          recipient: participant_two_username,
          message: message.message,
          created_At: date
        }, function(err, newmessage) {
          io.emit('displayNewPrivateMessage', newmessage)
        })

    });

    // get all private messages for two particular users

    socket.on('displayPrivateMessages', function(chatParam) {
      // get all private chat from the database

     UserChat.find({}, function(err, chats) {
      const allmessages = [];
      chats.forEach(chat => {

         if ((chat.conversationId === chatParam.participant_one + chatParam.participant_two) || (chat.conversationId = chatParam.participant_two + chatParam.participant_one)) {
           allmessages.push(chat);
         }
       })
      socket.emit('onDisplayPrivateMessages', allmessages);
     })
    })
  });

  http.listen(4444);



module.exports = router;