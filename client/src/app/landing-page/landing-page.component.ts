import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    // if user is logged in redirect user to dashboard else if user is not logged in redirect user to login page

    const logInStatus = localStorage.getItem('isLogged');

    if (logInStatus === 'userLoggedIn') {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
