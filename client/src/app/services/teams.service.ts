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

    // store the id of the team lead for easy identification

    const teamleadId = localStorage.getItem('currentUserId');

    // send team details to backend for new team creation

    return this.http.post('http://localhost:3001/add-new-team', {
      team_name: team.teamname,
      team_project: team.teamproject,
      team_lead: team.teamlead,
      team_lead_id: teamleadId,
      team_description: team.teamdescription,
      team_projectId: projectId
    });
  }

  // get data about a team assigned to a particular user & project

  getProjectTeam() {
    // store value of project id for easy identification of team project

    const projectId = localStorage.getItem('project-id');

    // store the id of the team lead for easy identification

    const teamleadId = localStorage.getItem('currentUserId');

    console.log(projectId, teamleadId);

    // send data to backend to return data on the team associated with the project

    return this.http.post('http://localhost:3001/get-user-team', {
      team_projectId: projectId
    }).pipe(map(this.extractData), catchError(this.handleError));
  }

  // send team id to backend for deletions

  disbandTeam(teamId) {
    return this.http.post('http://localhost:3001/disband-team', {
      teamId
    });
  }

  // get a list of all teams from the database

  getAllTeams() {
    // send http request to database and extract data sent back as response

    return this.http.get('http://localhost:3001/get-all-teams').pipe(map(this.extractData), catchError(this.handleError));
  }

  // return a list of teams being led by one particular team leader

  getTeamByTeamLead(teamLeadId) {
     // send data to backend to return data on all teams led by one team lead

     return this.http.post('http://localhost:3001/get-all-user-team', {
      team_lead_id: teamLeadId
    }).pipe(map(this.extractData), catchError(this.handleError));
  }

  // receive team parameters to send to database to creat a new team member

  addTeamMember(
    currentUser,
    currentUserId,
    currentTeam,
    currentTeamId,
    currentProject,
    currentProjectId
  ) {
    return this.http.post('http://localhost:3001/join-team', {
      currentUser,
      currentUserId,
      currentTeam,
      currentTeamId,
      currentProject,
      currentProjectId
    }).pipe(map(this.extractData), catchError(this.handleError));
  }

  // receive team parameters to send to database to confirm team member

  confirmTeamMember(
    currentUser,
    currentUserId,
    currentTeam,
    currentTeamId,
    currentProject,
    currentProjectId
  ) {
    return this.http.post('http://localhost:3001/confirm-team-member', {
      currentUser,
      currentUserId,
      currentTeam,
      currentTeamId,
      currentProject,
      currentProjectId
    }).pipe(map(this.extractData), catchError(this.handleError));
  }

  // retrieve list of team mebers from the backend

  getTeamMembers(currentTeam, currentTeamId) {
    return this.http.post('http://localhost:3001/get-team-members', {
      currentTeam,
      currentTeamId
    }).pipe(map(this.extractData), catchError(this.handleError));
  }
}
