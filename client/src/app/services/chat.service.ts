import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Observer, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { GroupChat } from '../group-chat';
import { UserChat } from '../user-chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  selectedUser = {
    username: ''
  };

  constructor(private http: HttpClient, private socket: Socket) {
   }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  // send group chat message to the backend

  sendGroupMessage(chatData) {
    this.socket.emit('sendGroupMessage', chatData);
  }

  // display group chat messages

  displayGroupMessages(projectId) {
    this.socket.emit('displayGroupMessages', projectId);
  }

  public onFoundMessages(): Observable<GroupChat[]> {
    // listen for an event in order to display messages

    return new Observable<GroupChat[]>(observer => {
      this.socket.on('displayFoundMessages', (data: GroupChat[]) => observer.next(data));
    });
  }

  public onFoundMessage(): Observable<GroupChat> {
    // listen for an event in order to display one message

    return new Observable<GroupChat>(observer => {
      this.socket.on('displayFoundMessage', (data: GroupChat) => {
        observer.next(data);
      });
    });
  }

  // send private message object to socket server

  sendPrivateMessage(message) {
    this.socket.emit('sendPrivateMessage', message);
  }

  public onPrivateMessage(): Observable<UserChat> {
    // listen for an event in order to display one message

    return new Observable<UserChat>(observer => {
      this.socket.on('displayNewPrivateMessage', (data: UserChat) => {
        observer.next(data);
      });
    });
  }

  // display private messages between two users

  displayPrivateMessages(participant_one, participant_two) {
    const chatParam = {participant_one, participant_two};
    this.socket.emit('displayPrivateMessages', chatParam);
  }

  public onDisplayPrivateMessages(): Observable<UserChat[]> {
    // listen for an event in order to display messages

    return new Observable<UserChat[]>(observer => {
      this.socket.on('onDisplayPrivateMessages', (data: UserChat[]) => observer.next(data));
    });
  }

  // get all active conversations for a particular user

  /*getUserConversations(userId) {
    return this.http.post('http://localhost:3001/get-user-conversations', {
      userId
    });
  }*/
}
