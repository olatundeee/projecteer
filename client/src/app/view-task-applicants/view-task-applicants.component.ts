import { Component, OnInit } from '@angular/core';
import { TaskApplicationService } from '../services/task-application.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DelegateTaskComponent } from '../delegate-task/delegate-task.component';

@Component({
  selector: 'app-view-task-applicants',
  templateUrl: './view-task-applicants.component.html',
  styleUrls: ['./view-task-applicants.component.css']
})
export class ViewTaskApplicantsComponent implements OnInit {

  applicants;

  constructor(
    private taskApplicationService: TaskApplicationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

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

  // delegate task to a particular applicant for completion

  delegateTask(applicant): void {
    // store applicant data in local storage

    localStorage.removeItem('task-id');
    localStorage.setItem('task-id', applicant.taskId);

    localStorage.removeItem('task-title');
    localStorage.setItem('task-title', applicant.taskTitle);

    localStorage.removeItem('task-project-id');
    localStorage.setItem('task-project-id', applicant.taskProjectId);

    localStorage.removeItem('applicantId');
    localStorage.setItem('applicantId', applicant.taskApplicantId);

    localStorage.removeItem('applicant');
    localStorage.setItem('applicant', applicant.taskApplicant);

    // open delegate task modal

    const dialogRef = this.dialog.open(DelegateTaskComponent, {
      width: '50%'
    });
  }

}
