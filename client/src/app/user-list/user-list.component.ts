import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    // make call to user service to return a list of all users

    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });


    // /dashboard/teams/admin-view-team
  }

  // users with the role of administrator can view profile of a particular user by calling the following function

  adminViewProfile(user) {

    // store user data in local storage for future reference

    localStorage.removeItem('userIdToView');
    localStorage.setItem('userIdToView', user._id);

    localStorage.removeItem('userNameToView');
    localStorage.setItem('userNameToView', user.username);

    // navigate to admin view profile component

    this.router.navigateByUrl('/dashboard/users/admin-view-profile');
  }

   // users with the role of administrator can view projects of a particular user by calling the following function

  adminViewProjects(user) {
    // store user data in local storage for future reference

    localStorage.removeItem('userIdToView');
    localStorage.setItem('userIdToView', user._id);

    // navigate to admin view profile component

    this.router.navigateByUrl('/dashboard/projects/admin-view-projects');
  }

}
