import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-every-team',
  templateUrl: './view-every-team.component.html',
  styleUrls: ['./view-every-team.component.css']
})
export class ViewEveryTeamComponent implements OnInit {

  teams;

  constructor(private teamService: TeamsService, private router: Router) { }

  ngOnInit() {
    // get a list of all teams from the database

    this.teamService.getAllTeams().subscribe(res => {
      this.teams = res;
      console.log(res);
    });
  }

  // view details of a particular team

  viewTeam(team) {
    // use local storage to store project data in order to assign data to team;

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', team.team_projectId);

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', team.team_project);

    // store team id in local storage for easy identification

    localStorage.removeItem('currentTeamId');
    localStorage.setItem('currentTeamId', team._id);

    // store team name in local storage for easy identification

    localStorage.removeItem('currentTeam');
    localStorage.setItem('currentTeam', team.team_name);

    // store team project in local storage for easy identification

    localStorage.removeItem('currentProject');
    localStorage.setItem('currentProject', team.team_project);

    // store team project in local storage for easy identification

    localStorage.removeItem('currentProjectId');
    localStorage.setItem('currentProjectId', team.team_projectId);

    this.router.navigateByUrl('/dashboard/teams');
  }

}
