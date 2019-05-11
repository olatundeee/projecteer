import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { TaskApplicationService } from '../services/task-application.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task_title;
  task_description;
  task_reason;
  task_result;
  displayApply;

  constructor(private taskService: TasksService, private taskApplicationService: TaskApplicationService) { }

  ngOnInit() {
    // get task data stored in local storage

    this.task_title = localStorage.getItem('task-name');

    this.task_description = localStorage.getItem('task-description');

    this.task_reason = localStorage.getItem('task-reason');

    this.task_result = localStorage.getItem('task-result');

    // get the user id for currently logged in user

    const currentUserId = localStorage.getItem('currentUserId');

    // get the id of the task creator

    const taskCreatorId = localStorage.getItem('task-creator-id');

    // if currently logged in user id is not the same as the task creator id display the apply button

    if (currentUserId !== taskCreatorId) {
      this.displayApply = true;
    }
  }

  // send in credentials of currently logged in user and the applied for task with respect to application for task delegation

  applyForTask() {
    const task_id = localStorage.getItem('task-id');

    const task_title = localStorage.getItem('task-name');

    const task_project_id = localStorage.getItem('task-project-id');

    const currentUserId = localStorage.getItem('currentUserId');

    const currentUser = localStorage.getItem('currentUser');

    // send task and applicant credentials to task application service to register the application

    this.taskApplicationService.applyForTask(task_id, task_title, task_project_id, currentUserId, currentUser).subscribe();
  }

  // confirm if currently logged in user has already applied for task before

  confirmUserApplication() {}

}
