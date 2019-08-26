import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;
  displayAddBio;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // display add bio button on initialization

    this.displayAddBio = true;

    // get profile details for the currently logged in user

    this.userService.getProfileDetails().subscribe(res => {
      this.profile = res;

      // console.log(res);

      // check if user has already added a profile, if true, do not display the add bio button

      if (this.profile.profile_added === true) {
        this.displayAddBio = false;
      }
    });
  }

  // get profile object and strore its data in local storage

  editBio(profile) {
    console.log(profile);

    localStorage.removeItem('profileFullname');
    localStorage.setItem('profileFullname', profile.fullname);

    localStorage.removeItem('profileAddress');
    localStorage.setItem('profileAddress', profile.address);

    localStorage.removeItem('profilePhone');
    localStorage.setItem('profilePhone', profile.phonenumber);

    localStorage.removeItem('profileSkills');
    localStorage.setItem('profileSkills', profile.skills);

    localStorage.removeItem('profileInstagram');
    localStorage.setItem('profileInstagram', profile.instagram);

    localStorage.removeItem('profileLinkedin');
    localStorage.setItem('profileLinkedin', profile.linkedin);

    localStorage.removeItem('profileFacebook');
    localStorage.setItem('profileFacebook', profile.facebook);

    localStorage.removeItem('profileTwitter');
    localStorage.setItem('profileTwitter', profile.twitter);

    localStorage.removeItem('profileSkype');
    localStorage.setItem('profileSkype', profile.skype);

    this.router.navigateByUrl('/dashboard/users/edit-profile');
  }

}
