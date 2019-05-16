import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TaskDelegationService } from '../services/task-delegation.service';

@Component({
  selector: 'app-delegate-task',
  templateUrl: './delegate-task.component.html',
  styleUrls: ['./delegate-task.component.css']
})
export class DelegateTaskComponent implements OnInit {

  taskId;
  taskTitle;
  taskProjectId;
  taskApplicantId;
  taskApplicant;
  delegationResponse;
  taskDelegated;
  taskNotDelegated;

  constructor(
    public dialogRef: MatDialogRef<DelegateTaskComponent>,
    private taskDelegationService: TaskDelegationService
  ) { }

  ngOnInit() {
    // get applicant data in local storage

    this.taskId = localStorage.getItem('task-id');

    this.taskTitle
     = localStorage.getItem('task-title');

    this.taskProjectId = localStorage.getItem('task-project-id');

    this.taskApplicantId = localStorage.getItem('applicantId');

    this.taskApplicant = localStorage.getItem('applicant');

    // confirm if task is delegated to current applicant

    this.taskDelegationService.confirmTaskDelegation(
      this.taskId,
      this.taskTitle,
      this.taskProjectId,
      this.taskApplicantId,
      this.taskApplicant
    ).subscribe(res => {

      this.delegationResponse = res;

      // if no matching record of delegation is found display the delegate button

      const delegationResponse = this.delegationResponse;

      if (delegationResponse === 'No delegation yet') {
          this.taskNotDelegated = true;
        }

      const delegatedToId = this.delegationResponse.taskDelegatedToId;
      const taskId = this.delegationResponse.taskId;


      // if task was delegated to this applicant the delegated button will be displayed

      if (delegatedToId === this.taskApplicantId && taskId === this.taskId) {
          this.taskDelegated = true;
        }
    });

  }

  delegateTask() {
    // store applicant data in object in order to send to the service for delegation

    const applicant = {
      taskId: localStorage.getItem('task-id'),
      taskTitle: localStorage.getItem('task-title'),
      taskProjectId: localStorage.getItem('task-project-id'),
      taskApplicantId: localStorage.getItem('applicantId'),
      taskApplicant: localStorage.getItem('applicant')
    };

    // send applicant data to service

    this.taskDelegationService.delegateTask(applicant).subscribe(res => {
      console.log('Task delegated');
    });

    // display delegated button

    this.taskDelegated = true;

    // remove delegate button from view

    this.taskNotDelegated = false;
  }

}
