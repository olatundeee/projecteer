import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-view-profile',
  templateUrl: './admin-view-profile.component.html',
  styleUrls: ['./admin-view-profile.component.css']
})
export class AdminViewProfileComponent implements OnInit {

  profile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // get user data to view profile details

    const userId = localStorage.getItem('userIdToView');
    const username = localStorage.getItem('userNameToView');

    // call admin view profile in user service to return user profile data

    this.userService.adminViewProfile(userId, username).subscribe(res => {
      this.profile = res;
    });
  }

}
