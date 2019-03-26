import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ProjectsService]
})
export class AddProjectComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    const userId = localStorage.getItem('currentUserId');

    console.log(userId);
  }

  // grab form data and send to projects service

  addProject(form: NgForm) {
    console.log(form.value);

    this.projectService.addProject(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
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

  // reset form after sending data to projects service

  resetForm(form: NgForm) {
    this.projectService.selectedProject = {
      projectname: '',
      projectproblems: '',
      projectsolutions: '',
      projectdescription: ''
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }

}
