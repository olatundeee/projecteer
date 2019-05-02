import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  teamMembers;

  constructor(private teamService: TeamsService) { }

  ngOnInit() {

    // get current team name and id in order to be able to retreive team members data

    const currentTeam = localStorage.getItem('currentTeam');
    const currentTeamId = localStorage.getItem('currentTeamId');

    // make a call to team service to return a list of team members for the requested project from the api

    this.teamService.getTeamMembers(currentTeam, currentTeamId).subscribe(res => {
      this.teamMembers = res;
    });
  }

  // view team member profile details

  viewProfile(member) {
    console.log(member);
  }

}
