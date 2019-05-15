import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-applicant-profile',
  templateUrl: './view-applicant-profile.component.html',
  styleUrls: ['./view-applicant-profile.component.css']
})
export class ViewApplicantProfileComponent implements OnInit {

  profile;

  constructor(private userService: UserService) { }

  ngOnInit() {

    // retreive applicant data from local storage

    const applicant = localStorage.getItem('applicant');

    const applicantId = localStorage.getItem('applicantId');

    // make a call to user service to retreive applicant profile data

    this.userService.viewApplicantProfile(applicantId, applicant).subscribe(res => {
      this.profile = res;
    });
  }

}
