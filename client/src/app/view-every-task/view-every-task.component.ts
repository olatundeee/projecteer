import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-view-every-task',
  templateUrl: './view-every-task.component.html',
  styleUrls: ['./view-every-task.component.css']
})
export class ViewEveryTaskComponent implements OnInit {

  tasks;

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    // get all tasks stored in the database

    this.taskService.getAllTasks().subscribe(res => {
      this.tasks = res;
    });
  }

}
