import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
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

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    // get task data stored in local storage

    this.task_title = localStorage.getItem('task-name');

    this.task_description = localStorage.getItem('task-description');

    this.task_reason = localStorage.getItem('task-reason');

    this.task_result = localStorage.getItem('task-result');
  }

}
