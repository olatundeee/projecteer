import { Injectable } from '@angular/core';
import { Signup } from '../signup';
import { Login } from '../login';
import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged: boolean;

  selectedUser: Signup = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

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

  // receive registration data from signup component

  registerUser(user) {
    console.log(user);

    // send registration data to backend through post request

    return this.http.post('http://localhost:3001/register', {
      user
    });
  }

  // receive data from login component

  login(user) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify({username: user.email}));

    return this.http.post<Login>('http://localhost:3001/login', {
      email: user.email,
      password: user.password
    });
  }

  // log user out of dashboard area

  logout() {
    // send http request to backend to log user out

    this.http.get('http://localhost:3001/logout').subscribe(
      function(result) {
        console.log(result);
      }
    );
  }
}
