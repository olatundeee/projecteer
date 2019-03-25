import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // register the new user, send data to user service to process the registration

  register(form: NgForm) {

    // use registerUser() in user service to process registration

    this.userService.registerUser(form.value).subscribe(
      res => {
        // if registration is successful display success message then reset form to contain no values

        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        // if there is an error during registration display an error message

        if (err.status === 442) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
         this.serverErrorMessages = 'Something went wrong. Please contact admin';
         console.log(err);
        }
      }
    );
  }

  // reset form after sending data to user service

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      email: '',
      username: '',
      password: ''
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }

}
