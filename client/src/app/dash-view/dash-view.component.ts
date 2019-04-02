import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { TeamsService } from '../services/teams.service';
import { ProjectsService } from '../services/projects.service';
import { Task } from '../task';
import { Router } from '@angular/router';

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
    private taskService: TasksService, private teamService: TeamsService, private projectService: ProjectsService, private router: Router
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

  // view details of all user projects


  viewUserProject(userproject) {
    // use local storage to store project data in order to view details;

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', userproject.project_name);

    localStorage.removeItem('project-description');
    localStorage.setItem('project-description', userproject.project_description);

    localStorage.removeItem('project-solutions');
    localStorage.setItem('project-solutions', userproject.project_solutions);

    localStorage.removeItem('project-problems');
    localStorage.setItem('project-problems', userproject.project_problems);

    // use router to navigate to project details view

    this.router.navigateByUrl('/dashboard/projects/project-details');
  }

  // view the tasks listed under the user's projects

  viewUserProjectTasks(userproject) {
    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', userproject._id);

    // use router to navigate to project tasks view

    this.router.navigateByUrl('/dashboard/tasks');
  }

  // retrieve details of one particular task for display

  viewUserTask(usertask) {
    // store task data in local storage for reference

    localStorage.removeItem('task-id');
    localStorage.setItem('task-id', usertask._id);

    localStorage.removeItem('task-name');
    localStorage.setItem('task-name', usertask.task_title);

    localStorage.removeItem('task-description');
    localStorage.setItem('task-description', usertask.task_description);

    localStorage.removeItem('task-reason');
    localStorage.setItem('task-reason', usertask.task_reason);

    localStorage.removeItem('task-result');
    localStorage.setItem('task-result', usertask.task_result);
    this.router.navigateByUrl('/dashboard/tasks/task-detail');
  }

  // view details of the team

  viewUserTeam(userteam) {
    console.log(userteam);
    // use local storage to store project data in order to assign data to team;

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', userteam.team_projectId);

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', userteam.team_project);

    this.router.navigateByUrl('/dashboard/teams');
  }
}
