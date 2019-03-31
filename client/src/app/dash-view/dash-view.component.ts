import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { TeamsService } from '../services/teams.service';
import { ProjectsService } from '../services/projects.service';
import { Task } from '../task';

@Component({
  selector: 'app-dash-view',
  templateUrl: './dash-view.component.html',
  styleUrls: ['./dash-view.component.css']
})
export class DashViewComponent implements OnInit {

  alltasks;
  alltasksNumber;
  allprojects;
  allprojectsNumber;
  allteams;
  allteamsNumber;
  usertasks;
  userprojects;
  userteams;

  constructor(
    private taskService: TasksService, private teamService: TeamsService, private projectService: ProjectsService
  ) { }

  ngOnInit() {
    // get all tasks stored in the database

    this.taskService.getAllTasks().subscribe(res => {
      console.log(res);

      // record number of documents sent back as response for get all tasks http request

      this.alltasks = res;
      this.alltasksNumber = this.alltasks.length;
    });

    // get all projects stored in the database

    this.projectService.getAllProjects().subscribe(res => {
      console.log(res);

      // record number of documents sent back as response for get all projects http request

      this.allprojects = res;
      this.allprojectsNumber = this.allprojects.length;
    });

    // get all teams stored in the database

    this.teamService.getAllTeams().subscribe(res => {
      console.log(res);

      // record number of documents sent back as response for get all teams http request

      this.allteams = res;
      this.allteamsNumber = this.allteams.length;
    });

    // retrieve current user id to be able to get all projects

    const userId = localStorage.getItem('currentUserId');

    // get all projects by one particular user

    this.projectService.getAllUserProjects(userId).subscribe(res => {
      console.log(res);

      this.userprojects = res;
    });

    // get all teams by one particular user

    this.teamService.getTeamByTeamLead(userId).subscribe(res => {
      console.log(res);

      this.userteams = res;
    });

    // get all tasks by one particular user

    this.taskService.getTasksByAddedBy().subscribe(res => {
      console.log(res);

      this.usertasks = res;
    });

  }

}
