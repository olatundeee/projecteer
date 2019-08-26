import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserChat } from '../user-chat';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('mainScreen') private myScrollContainer: ElementRef;
  viewHeight;
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
      participant_one: localStorage.getItem('currentUserId'),
      participant_one_username: localStorage.getItem('currentUser'),
      participant_two: localStorage.getItem('RecipientId'),
      participant_two_username: localStorage.getItem('Recipient'),
      message: this.message,
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
}

}
