import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project_name;
  project_description;
  project_solutions;
  project_problems;

  constructor() { }

  ngOnInit() {
    // get and initialize project details stored in localStorage

    this.project_name = localStorage.getItem('project-name');

    this.project_description = localStorage.getItem('project-description');

    this.project_problems = localStorage.getItem('project-problems');

    this.project_solutions = localStorage.getItem('project-solutions');

    document.getElementById('project_description').innerHTML = this.project_description;

    document.getElementById('project_problems').innerHTML = this.project_problems;

    document.getElementById('project_solution').innerHTML = this.project_solutions;
  }

}
