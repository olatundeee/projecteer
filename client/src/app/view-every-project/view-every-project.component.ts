import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-every-project',
  templateUrl: './view-every-project.component.html',
  styleUrls: ['./view-every-project.component.css']
})
export class ViewEveryProjectComponent implements OnInit {

  projects;

  constructor(private projectService: ProjectsService, private router: Router) { }

  ngOnInit() {
    // retreive all projects stored in the database for display onn this view

    this.projectService.getAllProjects().subscribe(res => {
      console.log(res);

      // store api response in orjects variable

      this.projects = res;
    });
  }

  viewProjectDetails(project) {
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

  viewTaskDetails(project) {
    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', project.project_name);

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

    // use router to navigate to tasks list view
    this.router.navigateByUrl('/dashboard/tasks');
  }

  // view details of the team assigned to this project

  viewTeam(project) {
    // use local storage to store project data in order to assign data to team;

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', project.project_name);

    this.router.navigateByUrl('/dashboard/teams');
  }

}
