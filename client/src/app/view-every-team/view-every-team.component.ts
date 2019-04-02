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
  isTeamLead;
  isNotTeamLead;

  constructor(private teamService: TeamsService, private router: Router) { }

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

  // view details of a particular team

  viewTeam(team) {
    // use local storage to store project data in order to assign data to team;

    localStorage.removeItem('project-id');
    localStorage.setItem('project-id', team.team_projectId);

    localStorage.removeItem('project-name');
    localStorage.setItem('project-name', team.team_project);

    this.router.navigateByUrl('/dashboard/teams');
  }

}
