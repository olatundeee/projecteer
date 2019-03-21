import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  providers: [ProjectsService]
})
export class EditProjectComponent implements OnInit {

  project = {
    projectname: localStorage.getItem('project-name'),
    projectproblems: localStorage.getItem('project-problems'),
    projectsolution: localStorage.getItem('project-solutions'),
    projectdescription: localStorage.getItem('project-description'),
  };

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
  }

  // grab editted data from form and send to projects service

  editProject(form: NgForm) {
    console.log(form.value);
    const project = {
      id: localStorage.getItem('project-id'),
      projectname: form.value.projectname,
      projectproblems: form.value.projectproblems,
      projectsolution: form.value.projectsolution,
      projectdescription: form.value.projectdescription
    };

    this.projectService.editProject(project).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
      },
      err => {
        if (err.status === 442) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
         this.serverErrorMessages = 'Something went wrong. Please contact admin';
         console.log(err);
        }
      }
    );
  }


}
