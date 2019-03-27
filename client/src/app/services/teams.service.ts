import { Injectable } from '@angular/core';
import { Team } from '../team';
import { HttpClient,  HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  selectedTeam: Team = {
    teamname: '',
    teamproject: localStorage.getItem('project-name'),
    teamlead: localStorage.getItem('currentUser'),
    teamdescription: ''
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

  // get new team data from add new team component and send to backend

  addTeam(team) {
    // store value of project id for easy identification of team project

    const projectId = localStorage.getItem('project-id');

    // send team details to backend for new team creation

    return this.http.post('http://localhost:3001/add-new-team', {
      team_name: team.teamname,
      team_project: team.teamproject,
      team_lead: team.teamlead,
      team_description: team.teamdescription,
      team_projectId: projectId
    });
  }
}
