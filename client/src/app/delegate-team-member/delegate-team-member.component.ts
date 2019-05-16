import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { TaskDelegationService } from '../services/task-delegation.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DelegateTaskComponent } from '../delegate-task/delegate-task.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delegate-team-member',
  templateUrl: './delegate-team-member.component.html',
  styleUrls: ['./delegate-team-member.component.css']
})
export class DelegateTeamMemberComponent implements OnInit {

  teamMembers;

  constructor(
    private teamService: TeamsService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    // get the value of current task id from local storage

    const taskId = localStorage.getItem('task-id');

    // get the value of the current task title from local storage

    const taskTitle = localStorage.getItem('task-name');

    // get current team id and team name from local storage

    const teamId = localStorage.getItem('team-id');
    const teamName = localStorage.getItem('team-name');

    // return a list of team members in the provided team

    this.teamService.getTeamMembers(teamName, teamId).subscribe(res => {
      this.teamMembers = res;
    });
  }

  // delegate task to a team member

  delegateTask(teamMember) {
    // store team member username and id from local storage

    localStorage.removeItem('applicantId');
    localStorage.setItem('applicantId', teamMember.currentUserId);

    localStorage.removeItem('applicant');
    localStorage.setItem('applicant', teamMember.currentUser);

    // open delegate task modal

    const dialogRef = this.dialog.open(DelegateTaskComponent, {
      width: '50%'
    });
  }

  // view the profile details of the chosen applicant

  viewApplicantProfile(teamMember) {

    // store team member username and id from local storage

    localStorage.removeItem('applicantId');
    localStorage.setItem('applicantId', teamMember.currentUserId);

    localStorage.removeItem('applicant');
    localStorage.setItem('applicant', teamMember.currentUser);

    this.router.navigateByUrl('/dashboard/users/view-applicant-profile');
  }

}
