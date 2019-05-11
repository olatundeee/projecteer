import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-every-task',
  templateUrl: './view-every-task.component.html',
  styleUrls: ['./view-every-task.component.css']
})
export class ViewEveryTaskComponent implements OnInit {

  tasks;

  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit() {
    // get all tasks stored in the database

    this.taskService.getAllTasks().subscribe(res => {
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

    localStorage.removeItem('task-creator');
    localStorage.setItem('task-creator', task.task_added_by);

    localStorage.removeItem('task-creator-id');
    localStorage.setItem('task-creator-id', task.task_added_by_id);

    localStorage.removeItem('task-project-id');
    localStorage.setItem('task-project-id', task.project_id);

    this.router.navigateByUrl('/dashboard/tasks/task-detail');
  }
}
