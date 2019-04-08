import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
  providers: [UserService]
})
export class AddProfileComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  fullname = '';
  address = '';
  phonenumber = '';
  skills = '';
  instagram = '';
  linkedin = '';
  facebook = '';
  twitter = '';
  skype = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // add user profile using data grabbed from the form

  addProfile() {
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

    this.userService.addProfile(form).subscribe(res => {
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
