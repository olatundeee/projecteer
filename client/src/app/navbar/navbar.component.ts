import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  // log user out of dashboard area

  logout() {

    // remove token from local storage
    localStorage.removeItem('TOKEN');

    // access user service and execute logout()
    this.userService.logout();

    // navigate back to the login page
    this.router.navigateByUrl('/login');
  }

}
