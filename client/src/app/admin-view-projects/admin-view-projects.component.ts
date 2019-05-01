import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-projects',
  templateUrl: './admin-view-projects.component.html',
  styleUrls: ['./admin-view-projects.component.css']
})
export class AdminViewProjectsComponent implements OnInit {

  projects;

  constructor(private projectService: ProjectsService, private router: Router) { }

  ngOnInit() {
    // send a signal to the projects service to retrieve all currently active projects for a particular user through api

    const userId = localStorage.getItem('userIdToView');

    this.projectService.getAllUserProjects(userId).subscribe(res => {
      this.projects = res;
    });
  }

  // navigate to the project details page to see all details about the project

  viewProject(project) {

    // use local storage to store project data in order to view details;

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', project.project_name);

    localStorage.removeItem('project-description');
    localStorage.setItem('project-description', project.project_description);

    localStorage.removeItem('project-solutions');
    localStorage.setItem('project-solutions', project.project_solutions);

    localStorage.removeItem('project-problems');
    localStorage.setItem('project-problems', project.project_problems);

    // use router to navigate to project details view

    this.router.navigateByUrl('/dashboard/projects/project-details');
  }

  // view all tasks listed under this project

  viewTasks(project) {
    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', project.project_name);

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

    // use router to navigate to tasks list view

    this.router.navigateByUrl('/dashboard/tasks');
  }

  // navigate to the team details page to see all details about the project team

  viewTeam(project) {
    // store project id in local storage for future reference

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

    // use router to navigate to admin view team page

    this.router.navigateByUrl('/dashboard/teams/admin-view-team');
  }

}
