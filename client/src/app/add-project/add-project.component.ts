import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ProjectsService]
})
export class AddProjectComponent implements OnInit {

  projectname = '';
  projectproblems = '';
  projectsolution = '';
  projectdescription = '';
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    // const userId = localStorage.getItem('currentUserId');

    // console.log(userId);


  }

  // grab form data and send to projects service

  addProject() {



    /*const form = {
      projectname: this.projectname,
      projectsolution: this.projectsolution,
      projectproblems: this.projectproblems,
      projectdescription: this.projectdescription
    };

    // console.log(form);

    this.projectService.addProject(form).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
        this.resetForm();
      },
      err => {
        if (err.status === 442) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
         this.serverErrorMessages = 'Something went wrong. Please contact admin';
         console.log(err);
        }
      }
    );*/
  }

  // reset form after sending data to projects service

  resetForm() {

    document.getElementById('projects_name').innerText = '';

    function iframeRef( frameRef ) {
      return frameRef.contentWindow
          ? frameRef.contentWindow.document
          : frameRef.contentDocument;
    }

    const projectproblemsFrame = iframeRef( document.getElementById('myEditor_ifr'));

    projectproblemsFrame.getElementById('tinymce').innerHTML = '';

    const projectsolutionFrame = iframeRef( document.getElementById('myEditorTwo_ifr'));

    projectsolutionFrame.getElementById('tinymce').innerHTML = '';

    const projectdescriptionFrame = iframeRef( document.getElementById('myEditorThree_ifr'));

    projectdescriptionFrame.getElementById('tinymce').innerHTML = '';

    this.serverErrorMessages = '';
  }

}
