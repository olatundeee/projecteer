import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  username = localStorage.getItem('currentUser');
  isUserAdmin;

  constructor() { }

  ngOnInit() {
    // get the user role for currently logged in user

    const isAdmin = localStorage.getItem('currentUserRole');

    console.log('User role: ' + isAdmin);

    // if currently logged in user is the administrator, display the users collection list item

    if (isAdmin === 'Administrator') {
      this.isUserAdmin = true;
    }
  }

}
