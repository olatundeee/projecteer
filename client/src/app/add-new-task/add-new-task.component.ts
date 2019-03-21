import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
  providers: [TasksService]
})
export class AddNewTaskComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private taskService: TasksService) { }

  ngOnInit() {
  }

  addTask(form: NgForm) {
    console.log(form.value);

    const project_id = localStorage.getItem('project-id');

    const task = {
      project_id: project_id,
      taskname: form.value.taskname,
      taskdescription: form.value.taskdescription,
      taskreason: form.value.taskreason,
      taskresult: form.value.taskresult
    };

    this.taskService.addTask(task).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
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

  // reset form after sending data to tasks service

  resetForm(form: NgForm) {
    this.taskService.selectedTask = {
      taskname: '',
      taskdescription: '',
      taskreason: '',
      taskresult: ''
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }

}
