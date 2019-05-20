import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskApplicationService {

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

  // receive application credentials made by a particular user for a specific task from task detail component

  applyForTask(taskId, taskTitle, taskProjectId, taskApplicantId, taskApplicant) {
    // send applicant and task data to backend

    return this.http.post('http://localhost:3001/apply-for-task', {
      taskId,
      taskTitle,
      taskProjectId,
      taskApplicantId,
      taskApplicant
    });
  }

  // confirm if currently logged in user has already applied for task before

  confirmUserApplication(taskId, taskApplicantId) {
    return this.http.post('http://localhost:3001/confirm-user-application', {
      taskId,
      taskApplicantId
    });
  }

  getTaskApplicants(taskId, taskTitle) {
    return this.http.post('http://localhost:3001/get-task-applicants', {
      taskId,
      taskTitle
    });
  }

  // return a list of applications by a specific user

  getUserApplications(applicantId) {
    return this.http.post('http://localhost:3001/get-user-applications', {
      applicantId
    });
  }
}
