import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoggedIn;
  userLoggedOut;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    // extract the value of user login status

    const isUserLoggged = localStorage.getItem('isLogged');

    // if user is logged in display logout button

    if (isUserLoggged === 'userLoggedIn') {
      this.userLoggedIn = true;
    }

  }

  // log user out of dashboard area

  logout() {

    // remove token from local storage
    localStorage.removeItem('TOKEN');

    // access user service and execute logout()
    this.userService.logout();

    // set the logged out confirmation value

    localStorage.removeItem('isLogged');
    localStorage.setItem('isLogged', 'userLoggedOut');

    // display login button remove logout button from view

    this.userLoggedOut = true;
    this.userLoggedIn = false;

    // navigate back to the login page
    this.router.navigateByUrl('/login');
  }

}
