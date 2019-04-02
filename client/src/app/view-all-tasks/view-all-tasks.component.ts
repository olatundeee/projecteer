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
  project_name = localStorage.getItem('project-name');
  isCurrentUser;

  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit() {
    const projectId = localStorage.getItem('project-id');

    // access task service and return all available tasks
    this.taskService.getTasksByProject(projectId).subscribe(res => {
      console.log(res);

      this.tasks = res;

      // disable display for delete and edit button if current user is not responsible for adding the tasks

      const currentUser = localStorage.getItem('currentUser');
      const currentUserId = localStorage.getItem('currentUserId');

      this.tasks.forEach(task => {
        if (task.task_added_by === currentUser && task.task_added_by_id === currentUserId) {
          this.isCurrentUser = true;
        }
      });
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
    this.router.navigateByUrl('/dashboard/tasks/task-detail');
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

    this.router.navigateByUrl('/dashboard/tasks/edit-task');
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
