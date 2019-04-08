import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // get profile details for the currently logged in user

    this.userService.getProfileDetails().subscribe(res => {
      this.profile = res;
    });
  }

}
