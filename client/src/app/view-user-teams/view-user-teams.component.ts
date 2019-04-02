import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-view-user-teams',
  templateUrl: './view-user-teams.component.html',
  styleUrls: ['./view-user-teams.component.css']
})
export class ViewUserTeamsComponent implements OnInit {

  teams;
  teamCreated;
  noteamCreated;
  isTeamLead;
  isNotTeamLead;

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.isNotTeamLead = true;

    // access teams service method getUserTeams to return data on the team associated with the project

    this.teamsService.getProjectTeam().subscribe(res => {
      this.teams = res;
      console.log(this.teams);

      // if a team has been created diplay the disband team button, if it hasn't display the create team button

      if (this.teams.team_isCreated === 'true') {
        this.teamCreated = true;
      } else {
        if (!this.teams.team_isCreated) {
          this.noteamCreated = true;
        }
      }

      // store team id in local storage for easy identification

      localStorage.removeItem('currentTeamId');
      localStorage.setItem('currentTeamId', this.teams._id);
    });
  }

  // delete project team if the neeed arises

  disbandTeam() {

    this.teamCreated = false;

    // get project team id and send to teams service for deletion

    const teamId = localStorage.getItem('currentTeamId');

    // send team id to teams service

    this.teamsService.disbandTeam(teamId).subscribe();

    this.teamsService.getProjectTeam().subscribe(res => {
      this.teams = res;
      console.log(this.teams);

      // if a team has been created diplay the disband team button, if it hasn't display the create team button

      if (this.teams.team_isCreated === 'true') {
        this.teamCreated = true;
      } else {
        if (!this.teams.team_isCreated) {
          this.noteamCreated = true;
        }
      }

      // store team id in local storage for easy identification

      localStorage.removeItem('currentTeamId');
      localStorage.setItem('currentTeamId', this.teams._id);
    });
  }

}
