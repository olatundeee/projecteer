import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private userService: UserService, private authService: AuthService, private router: Router
  ) { }

  ngOnInit() {
  }

  // log user in to dashboard area

  login() {

    // store form data in form object

    const form = {
      email: this.email,
      password: this.password
    };

    // send user data to user service

    this.userService.login(form).subscribe(
      r => {
        // if login is successful log user data in the console

        console.log(r.user);

        // if response from backend contains a token call auth service and set token value

        if (r.token) {
          this.authService.setToken(r.token);
          localStorage.setItem('authtoken', r.token);

          // remove current user id and set a new value for current user id, store in local storage

          localStorage.removeItem('currentUserId');
          localStorage.setItem('currentUserId', r.user._id);

          // remove current user name and set a new value for current user name, store in local storage

          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', r.user.username);

          // remove current user id and set a new value for current user id, store in local storage

          localStorage.removeItem('currentUserId');
          localStorage.setItem('currentUserId', r.user._id);

          // set the value for current user role in local storage

          localStorage.removeItem('currentUserRole');
          localStorage.setItem('currentUserRole', r.user.role);

          // navigate to the dashboard area

          this.router.navigateByUrl('/dashboard');
        }
      },
      r => {
        console.log(r.error.error);
      });
  }

}
