import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-admin-view-projects',
  templateUrl: './admin-view-projects.component.html',
  styleUrls: ['./admin-view-projects.component.css']
})
export class AdminViewProjectsComponent implements OnInit {

  projects;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    // send a signal to the projects service to retrieve all currently active projects for a particular user through api

    const userId = localStorage.getItem('userIdToView');

    this.projectService.getAllUserProjects(userId).subscribe(res => {
      this.projects = res;
    });
  }

}
