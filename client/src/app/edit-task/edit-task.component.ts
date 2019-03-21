import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task = {
    taskname: localStorage.getItem('task-name'),
    taskresult: localStorage.getItem('task-result'),
    taskreason: localStorage.getItem('task-reason'),
    taskdescription: localStorage.getItem('task-description'),
  };

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private taskService: TasksService) { }

  ngOnInit() {
  }

  // grab editted data from form and send to tasks service

  editTask(form: NgForm) {

    const id = localStorage.getItem('task-id');

    const task = {
      project_id: localStorage.getItem('project-id'),
      task_title: form.value.taskname,
      task_description: form.value.taskdescription,
      task_reason: form.value.taskreason,
      task_result: form.value.taskresult
    };

    this.taskService.editTask(id, task).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
      },
      err => {
        if (err.status === 442) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
         this.serverErrorMessages = 'Something went wrong. Please contact admin';
         console.log(err);
        }
      }
    );
  }

}
