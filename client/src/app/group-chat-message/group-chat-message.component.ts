import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-group-chat-message',
  templateUrl: './group-chat-message.component.html',
  styleUrls: ['./group-chat-message.component.css'],
  providers: [ChatService]
})
export class GroupChatMessageComponent implements OnInit {

  message = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  // send message information to chat service

  sendMessage() {
    const message = this.message;

    // store message data in an object

    const projectId = localStorage.getItem('project-id');

    const projectName = localStorage.getItem('project-name');

    const currentUserId = localStorage.getItem('currentUserId');

    const currentUser = localStorage.getItem('currentUser');

    const chatData = {
      projectName,
      projectId,
      message,
      currentUserId,
      currentUser
    };

    this.chatService.sendGroupMessage(chatData);
  }

}
