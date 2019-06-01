import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserChat } from '../user-chat';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  message = '';
  messages: UserChat[] = [];
  msgsArray;

  constructor(private chatService: ChatService) { }

  ngOnInit() {

    const senderId = localStorage.getItem('currentUserId');

    const recipientId = localStorage.getItem('RecipientId');

    // display previous chats between users

    this.chatService.displayPrivateMessages(senderId, recipientId);

    this.chatService.onDisplayPrivateMessages().subscribe((res: UserChat[]) => {
      const messagesArray = res;

      messagesArray.forEach(message => {
        this.messages.push(message);
      });
    });
  }

  // send chat message to recipient

  sendMessage() {

    const senderId = localStorage.getItem('currentUserId');

    const recipientId = localStorage.getItem('RecipientId');

    const message = {
      recipient: localStorage.getItem('Recipient'),
      recipientId: localStorage.getItem('RecipientId'),
      message: this.message,
      sender: localStorage.getItem('currentUser'),
      senderId: localStorage.getItem('currentUserId'),
      unique_chat_id_1: {
        senderId: localStorage.getItem('currentUserId'),
        recipientId: localStorage.getItem('RecipientId')
      }
    };

    // send message object to chat service

    this.chatService.sendPrivateMessage(message);

    // display chat message on scree

    this.chatService.onPrivateMessage().subscribe((res: UserChat) => {
      const newmessage = res;

      this.messages.push(newmessage);
    });

    this.message = '';


  }

}
