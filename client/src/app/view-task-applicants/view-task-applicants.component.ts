import { Component, OnInit } from '@angular/core';
import { TaskApplicationService } from '../services/task-application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task-applicants',
  templateUrl: './view-task-applicants.component.html',
  styleUrls: ['./view-task-applicants.component.css']
})
export class ViewTaskApplicantsComponent implements OnInit {

  applicants;

  constructor(private taskApplicationService: TaskApplicationService, private router: Router) { }

  ngOnInit() {
    // get the value of current task id from local storage

    const taskId = localStorage.getItem('task-id');

    // get the value of the current task titile from local storage

    const taskTitle = localStorage.getItem('task-name');

    // request for list of applicants from api

    this.taskApplicationService.getTaskApplicants(taskId, taskTitle).subscribe(res => {
      this.applicants = res;
    });
  }

  // view the profile details of the chosen applicant

  viewApplicantProfile(applicant) {

    localStorage.removeItem('applicantId');
    localStorage.setItem('applicantId', applicant.taskApplicantId);

    localStorage.removeItem('applicant');
    localStorage.setItem('applicant', applicant.taskApplicant);

    this.router.navigateByUrl('/dashboard/users/view-applicant-profile');
  }

}
