import { Injectable } from '@angular/core';
import { Project } from '../project';

import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  selectedProject: Project = {
    projectname: '',
    projectproblems: '',
    projectsolutions: '',
    projectdescription: ''
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  // receive form data to send as new project to backend

  addProject(project) {
    // send data through post request

    return this.http.post('http://localhost:3001/add-new-project', {
      project_name: project.projectname,
      project_description: project.projectdescription,
      project_problems: project.projectproblems,
      project_solutions: project.projectsolution,
      project_lead: localStorage.getItem('currentUserId')
    });
  }

  getAllProjects() {
    // retrieve all available projects through the api

    return this.http.get('http://localhost:3001/all-projects').pipe(map(this.extractData), catchError(this.handleError));
  }

  // get all projects registered to one user from the api

  getAllUserProjects(userId) {
    // return all projects containing a matching userid

    return this.http.post('http://localhost:3001/all-user-projects', {
      userId
    }).pipe(map(this.extractData), catchError(this.handleError));
  }

  deleteProject(project) {
    // send request to backend for project to be deleted from database
    const id = project._id;
    return this.http.post('http://localhost:3001/remove-project', {
      id
    });
  }

  editProject(project) {
    // get new project data and send to the backend for update

    return this.http.post('http://localhost:3001/update-project', {
      project,
      project_lead: localStorage.getItem('currentUserId')
    });
  }

  // delete all tasks listed under a project

  deleteProjectTasks(projectId) {
    // send project id to backend to delete all tasks listed under the project

    return this.http.post('http://localhost:3001/delete-project-tasks', {
      projectId
    });
  }
}
