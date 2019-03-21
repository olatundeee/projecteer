import { Injectable } from '@angular/core';
import { Task } from '../Task';

import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  selectedTask: Task = {
    taskname: '',
    taskdescription: '',
    taskreason: '',
    taskresult: ''
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

  // receive form data to send as new task to backend

  addTask(task) {
    // send data through post request

    return this.http.post('http://localhost:3001/add-new-task', {
      project_id: task.project_id,
      task_title: task.taskname,
      task_description: task.taskdescription,
      task_reason: task.taskreason,
      task_result: task.taskresult
    });
  }

  // get all tasks from the backend

  getAllTasks() {
    return this.http.get('http://localhost:3001/all-tasks').pipe(map(this.extractData), catchError(this.handleError));
  }

  // get one particular task from the backend

  getOneTask(id) {
    return this.http.post('http://localhost:3001/one-task', {
      id
    }).pipe(map(this.extractData), catchError(this.handleError));
  }

  // edit and update the data of an existing task

  editTask(id, task) {
    console.log(id, task);

    return this.http.post('http://localhost:3001/update-task', {
      id,
      task
    });
  }

  // send task data to backend for deletion

  deleteTask(task) {
    const id = task._id;
    return this.http.post('http://localhost:3001/remove-task', {
      id
    });
  }
}
