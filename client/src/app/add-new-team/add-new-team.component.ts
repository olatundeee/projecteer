import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-add-new-team',
  templateUrl: './add-new-team.component.html',
  styleUrls: ['./add-new-team.component.css'],
  providers: [TeamsService]
})
export class AddNewTeamComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private teamService: TeamsService) { }

  ngOnInit() {
  }

  // grab form data send to team service to add new team

  addTeam(form: NgForm) {
    this.teamService.addTeam(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout( () => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 442) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
         this.serverErrorMessages = 'Something went wrong. Please contact admin';
         console.log(err);
        }
      }
    );
  }

  // reset form after sending data to team service

  resetForm(form: NgForm) {
    this.teamService.selectedTeam = {
      teamname: '',
      teamproject: '',
      teamlead: '',
      teamdescription: ''
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }
}
