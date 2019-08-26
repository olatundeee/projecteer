import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { GroupChat } from '../group-chat';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, AfterViewInit {

  message = '';
  messages: GroupChat[] = [];
  msgsArray;

  // manipulate chat messages area

  @ViewChild('chatlist') private chatlist: ElementRef;

  constructor(private chatService: ChatService, private socket: Socket) { }

  ngOnInit() {
    // get project id to be used on project chat identification

    const projectId = localStorage.getItem('project-id');

    this.chatService.displayGroupMessages(projectId);

    this.chatService.onFoundMessages().subscribe((res: GroupChat[]) => {

      const messagesArray = res;

      messagesArray.forEach(message => {
        this.messages.push(message);
      });
    });

  }

  ngAfterViewInit() {
    this.scrollChatsToBottom();
  }

  // scroll chat list to the bottm to display last chat

  private scrollChatsToBottom() {
    this.chatlist.nativeElement.scrollTop = this.chatlist.nativeElement.scrollHeight;
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

    this.chatService.onFoundMessage().subscribe((res: GroupChat) => {
      const newmessage = res;

      this.messages.push(newmessage);
    });

    this.message = '';
  }

}
