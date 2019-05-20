import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  teamMembers;

  constructor(private teamService: TeamsService, private router: Router) { }

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

  viewMemberDetails(member) {

    // store member profile data in local storage for easy reference

    localStorage.removeItem('applicant');
    localStorage.setItem('applicant', member.currentUser);

    localStorage.removeItem('applicantId');
    localStorage.setItem('applicantId', member.currentUserId);

    // navigate to view applicant profile component

    this.router.navigateByUrl('/dashboard/users/view-applicant-profile');
  }

}
