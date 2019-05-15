import { Component, OnInit } from '@angular/core';
import { TaskApplicationService } from '../services/task-application.service';

@Component({
  selector: 'app-view-task-applicants',
  templateUrl: './view-task-applicants.component.html',
  styleUrls: ['./view-task-applicants.component.css']
})
export class ViewTaskApplicantsComponent implements OnInit {

  applicants;

  constructor(private taskApplicationService: TaskApplicationService) { }

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

}
