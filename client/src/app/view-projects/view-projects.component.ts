import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {

  projects;

  constructor(private router: Router, private projectService: ProjectsService) { }

  ngOnInit() {
    // send a signal to the projects service to retrieve all currently active projects through api

    const userId = localStorage.getItem('currentUserId');

    this.projectService.getAllUserProjects(userId).subscribe(res => {
      this.projects = res;
    });
  }

  // send project to project service in order to start the delete process

  deleteProject(project) {
    this.projectService.deleteProject(project).subscribe();

    // send data to project service to delete all tasks listed under a product

    this.projectService.deleteProjectTasks(project._id).subscribe();

    // send api request to retrieve all current projects in database after project has been deleted

    this.projectService.getAllProjects().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    });
  }

  // navigate to the project details page to see all details about the project

  viewProject(project) {
    console.log(project);

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

  editProject(project) {

    // use local storage to store project data in order to edit details;

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', project.project_name);

    localStorage.removeItem('project-description');
    localStorage.setItem('project-description', project.project_description);

    localStorage.removeItem('project-solutions');
    localStorage.setItem('project-solutions', project.project_solutions);

    localStorage.removeItem('project-problems');
    localStorage.setItem('project-problems', project.project_problems);

    // use router to navigate to edit project view

    this.router.navigateByUrl('/dashboard/projects/edit-project');
  }

  // add new task to the project

  addTask(project) {
    // use local storage to store project data in order to edit details;

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

    this.router.navigateByUrl('/dashboard/tasks/add-new-task');
  }

  // view all tasks listed under this project

  viewTasks(project) {
    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', project.project_name);

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', project._id);

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
