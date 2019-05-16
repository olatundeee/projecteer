import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskDelegationService {

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

  // deleegate task to a particular applicant

  delegateTask(applicant) {
    // send applicant and task data to backend for task delegation

    return this.http.post('http://localhost:3001/delegate-task', {
      taskId: applicant.taskId,
      taskTitle: applicant.taskTitle,
      taskProjectId: applicant.taskProjectId,
      taskDelegatedToId: applicant.taskApplicantId,
      taskDelegatedTo: applicant.taskApplicant
    });
  }

  // confirm if task is delegated to current applicant

  confirmTaskDelegation(taskId, taskTitle, taskProjectId, taskApplicantId, taskApplicant) {
    // send applicant and task data to backend to confirm task delegation

    return this.http.post('http://localhost:3001/confirm-task-delegation', {
      taskId: taskId,
      taskTitle: taskTitle,
      taskProjectId: taskProjectId,
      taskDelegatedToId: taskApplicantId,
      taskDelegatedTo: taskApplicant
    });
  }
}
