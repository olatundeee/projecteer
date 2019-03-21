import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-tasks',
  templateUrl: './view-all-tasks.component.html',
  styleUrls: ['./view-all-tasks.component.css']
})

export class ViewAllTasksComponent implements OnInit {

  tasks;
  task_name = localStorage.getItem('task-name');

  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit() {
    // access task service and return all available tasks
    this.taskService.getAllTasks().subscribe(res => {
      console.log(res);

      this.tasks = res;
    });
  }

  // access task service and return one particular task

  viewTask(task) {
    // store task data in local storage for reference

    localStorage.removeItem('task-id');
    localStorage.setItem('task-id', task._id);

    localStorage.removeItem('task-name');
    localStorage.setItem('task-name', task.task_title);

    localStorage.removeItem('task-description');
    localStorage.setItem('task-description', task.task_description);

    localStorage.removeItem('task-reason');
    localStorage.setItem('task-reason', task.task_reason);

    localStorage.removeItem('task-result');
    localStorage.setItem('task-result', task.task_result);
    this.router.navigateByUrl('/tasks/task-detail');
  }

  // edit and update an existing task

  editTask(task) {
    // use local storage to store task data in order to edit details;

    localStorage.removeItem('task-id');
    localStorage.setItem('task-id', task._id);

    localStorage.removeItem('task-name');
    localStorage.setItem('task-name', task.task_title);

    localStorage.removeItem('task-description');
    localStorage.setItem('task-description', task.task_description);

    localStorage.removeItem('task-reason');
    localStorage.setItem('task-reason', task.task_reason);

    localStorage.removeItem('task-result');
    localStorage.setItem('task-result', task.task_result);

    // use router to navigate to edit task view

    this.router.navigateByUrl('/tasks/edit-task');
  }

  // send task data to the service for deletion

  deleteTask(task) {
    this.taskService.deleteTask(task).subscribe();

    // send api request to retrieve all current tasks in database after task has been deleted

    this.taskService.getAllTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });
  }

}
