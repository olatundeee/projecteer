import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-view-every-project',
  templateUrl: './view-every-project.component.html',
  styleUrls: ['./view-every-project.component.css']
})
export class ViewEveryProjectComponent implements OnInit {

  projects;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    // retreive all projects stored in the database for display onn this view

    this.projectService.getAllProjects().subscribe(res => {
      console.log(res);

      // store api response in orjects variable

      this.projects = res;
    });
  }

}
