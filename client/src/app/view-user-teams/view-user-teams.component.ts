import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { Router } from '@angular/router';

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
  userIsNotTeamLead;
  member;

  constructor(private teamsService: TeamsService, private router: Router) { }

  ngOnInit() {
    this.isNotTeamLead = true;

    const currentUser = localStorage.getItem('currentUser');

    // access teams service method getUserTeams to return data on the team associated with the project

    this.teamsService.getProjectTeam().subscribe(res => {
      this.teams = res;

      // store team id in local storage for easy identification

      localStorage.removeItem('currentTeamId');
      localStorage.setItem('currentTeamId', this.teams._id);

      // store team name in local storage for easy identification

      localStorage.removeItem('currentTeam');
      localStorage.setItem('currentTeam', this.teams.team_name);

      // store team project in local storage for easy identification

      localStorage.removeItem('currentProject');
      localStorage.setItem('currentProject', this.teams.team_project);

      // store team project in local storage for easy identification

      localStorage.removeItem('currentProjectId');
      localStorage.setItem('currentProjectId', this.teams.team_projectId);

      // store team lead username in local storage for easy identification

      localStorage.removeItem('currentTeamLead');
      localStorage.setItem('currentTeamLead', this.teams.team_lead);

      // store team lead id in local storage for easy identification

      localStorage.removeItem('currentTeamLeadId');
      localStorage.setItem('currentTeamLeadId', this.teams.team_lead_id);


      // if a team has been created diplay the disband team button, if it hasn't display the create team button

      if (this.teams.team_isCreated === 'true') {
        this.teamCreated = true;
      } else {
        if (!this.teams.team_isCreated) {
          this.noteamCreated = true;
        }
      }

      // if current user is the same as team lead display the disabled joined button

      if (currentUser === this.teams.team_lead) {
        this.isTeamLead = true;
        this.isNotTeamLead = false;
      }

      // if current user is not the team lead display the contact team lead link

      if (currentUser !== this.teams.team_lead) {
        this.userIsNotTeamLead = true;
      }
    });

    // store team identification parameters as variable


    const currentUserId = localStorage.getItem('currentUserId');

    const currentTeam = localStorage.getItem('currentTeam');
    const currentTeamId = localStorage.getItem('currentTeamId');

    const currentProject = localStorage.getItem('currentProject');
    const currentProjectId = localStorage.getItem('currentProjectId');

    // confirm if current user is a team member

    // send team parameters to team service

    this.teamsService.confirmTeamMember(
      currentUser,
      currentUserId,
      currentTeam,
      currentTeamId,
      currentProject,
      currentProjectId
    ).subscribe(res => {

      this.member = res;

      // if returned credentials match available credentials display the disabled joined button

      if (
        currentUserId === this.member.currentUserId
        &&
        currentTeamId === this.member.currentTeamId
        &&
        currentProjectId === this.member.currentProjectId
      ) {
        this.isTeamLead = true;
        this.isNotTeamLead = false;
      }
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

  // user joins team as a team member

  joinTeam() {
    // store team identification parameters as variable

    const currentUser = localStorage.getItem('currentUser');
    const currentUserId = localStorage.getItem('currentUserId');

    const currentTeam = localStorage.getItem('currentTeam');
    const currentTeamId = localStorage.getItem('currentTeamId');

    const currentProject = localStorage.getItem('currentProject');
    const currentProjectId = localStorage.getItem('currentProjectId');


    // send team parameters to team service

    this.teamsService.addTeamMember(
      currentUser,
      currentUserId,
      currentTeam,
      currentTeamId,
      currentProject,
      currentProjectId
    ).subscribe(res => {
      this.isTeamLead = true;
      this.isNotTeamLead = false;
    });
  }


  // navigate to team members page

  viewTeamMembers() {

    this.router.navigateByUrl('/dashboard/teams/team-members');
  }

  // open private chat with project team lead

  contactTeamLead() {
    const currentTeamLeadId = localStorage.getItem('currentTeamLeadId');

    const currentTeamLead = localStorage.getItem('currentTeamLead');

    localStorage.removeItem('RecipientId');
    localStorage.setItem('RecipientId', currentTeamLeadId);

    localStorage.removeItem('Recipient');
    localStorage.setItem('Recipient', currentTeamLead);

    this.router.navigateByUrl('/dashboard/chat/user-chat');

  }

}
