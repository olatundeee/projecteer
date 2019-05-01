import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-admin-view-team',
  templateUrl: './admin-view-team.component.html',
  styleUrls: ['./admin-view-team.component.css']
})
export class AdminViewTeamComponent implements OnInit {

  teams;

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    // access teams service method getUserTeams to return data on the team associated with the project

    this.teamsService.getProjectTeam().subscribe(res => {
      this.teams = res;
    });
  }

}
