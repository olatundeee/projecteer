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

  // update role of the user with username administrator, new role is `administrator`

  makeUserAdmin() {
    console.log(localStorage.getItem('currentUser'));
    console.log(localStorage.getItem('currentUserId'));

    // send http request to backend

    return this.http.post('http://localhost:3001/create-admin', {});
  }

  // get profile data from add profile component and send to api to add profile information to database

  addProfile(profile) {
    const userId = localStorage.getItem('currentUserId');
    const username = localStorage.getItem('currentUser');
    console.log(profile);

    // send profile data to backend api

    return this.http.post('http://localhost:3001/create-profile', {
      userId,
      username,
      profile
    });
  }

  // get profile details from backend api/database

  getProfileDetails() {
    const userId = localStorage.getItem('currentUserId');
    const username = localStorage.getItem('currentUser');

    // send http request to return profile details for one particular user

    return this.http.post('http://localhost:3001/get-profile-details', {
      userId,
      username
    });
  }

  // get profile details from backend for admin/other users to view

  adminViewProfile(userId, username) {
    // send http request to return profile details for one particular user

    return this.http.post('http://localhost:3001/get-profile-details', {
      userId,
      username
    });
  }

  // task creator/project owner can view the profile details of a task applicant

  viewApplicantProfile(userId, username) {
    // send http request to return profile details for one particular user

    return this.http.post('http://localhost:3001/get-profile-details', {
      userId,
      username
    });
  }

  // get edited data from edit profile component to send to api for user profile editing

  editProfile(profile) {
    const userId = localStorage.getItem('currentUserId');
    const username = localStorage.getItem('currentUser');
    console.log(profile);

    // send profile data to backend api

    return this.http.post('http://localhost:3001/edit-profile', {
      userId,
      username,
      profile
    });
  }

  // return a list of all users from the database

  getAllUsers() {
    // send http request to retrieve all users to api

    return this.http.get('http://localhost:3001/all-users').pipe(map(this.extractData), catchError(this.handleError));
  }
}
