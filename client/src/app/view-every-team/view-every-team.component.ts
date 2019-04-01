import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-view-every-team',
  templateUrl: './view-every-team.component.html',
  styleUrls: ['./view-every-team.component.css']
})
export class ViewEveryTeamComponent implements OnInit {

  teams;
  isTeamLead;
  isNotTeamLead;

  constructor(private teamService: TeamsService) { }

  ngOnInit() {
    // get a list of all teams from the database

    this.teamService.getAllTeams().subscribe(res => {
      this.teams = res;
      console.log(res);

      const currentUser = localStorage.getItem('currentUser');

      this.teams.forEach(team => {
        if (currentUser === team.team_lead) {
          this.isTeamLead = true;
        } else {
          this.isNotTeamLead = true;
        }
      });

    });
  }

}
