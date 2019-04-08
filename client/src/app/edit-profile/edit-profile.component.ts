import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserService]
})
export class EditProfileComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  fullname = localStorage.getItem('profileFullname');
  address = localStorage.getItem('profileAddress');
  phonenumber =  localStorage.getItem('profilePhone');
  skills =  localStorage.getItem('profileSkills');
  instagram =  localStorage.getItem('profileInstagram');
  linkedin =  localStorage.getItem('profileLinkedin');
  facebook =  localStorage.getItem('profileFacebook');
  twitter =  localStorage.getItem('profileTwitter');
  skype =  localStorage.getItem('profileSkype');

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
// edit user profile using data grabbed from the form

editProfile() {
  const form = {
    fullname: this.fullname,
    address: this.address,
    phonenumber: this.phonenumber,
    skills: this.skills,
    instagram: this.instagram,
    linkedin: this.linkedin,
    facebook: this.facebook,
    twitter: this.twitter,
    skype: this.skype
  };

  // send form data to add profile method in user service

  this.userService.editProfile(form).subscribe(res => {
    this.showSuccessMessage = true;
    setTimeout( () => this.showSuccessMessage = false, 4000);
    this.resetForm();
  },
  err => {
    if (err.status === 442) {
      this.serverErrorMessages = err.error.join('<br/>');
    } else {
     this.serverErrorMessages = 'Something went wrong. Please contact admin';
     console.log(err);
    }
  });
}

 // reset form after sending data to tasks service

  resetForm() {
    this.fullname = '';
    this.address = '';
    this.phonenumber = '';
    this.skills = '';
    this.instagram = '';
    this.linkedin = '';
    this.facebook = '';
    this.twitter = '';
    this.skype = '';

    this.serverErrorMessages = '';
  }

}
