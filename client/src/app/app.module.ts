// modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
// components

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TasksComponent } from './tasks/tasks.component';
import { ViewAllTasksComponent } from './view-all-tasks/view-all-tasks.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashViewComponent } from './dash-view/dash-view.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';
import { AddNewTeamComponent } from './add-new-team/add-new-team.component';
import { ViewAllTeamsComponent } from './view-all-teams/view-all-teams.component';
import { ViewUserTeamsComponent } from './view-user-teams/view-user-teams.component';
import { ViewEveryProjectComponent } from './view-every-project/view-every-project.component';
import { ViewEveryTaskComponent } from './view-every-task/view-every-task.component';
import { ViewEveryTeamComponent } from './view-every-team/view-every-team.component';
import { ViewAllUserProjectsComponent } from './view-all-user-projects/view-all-user-projects.component';
import { ViewAllUserTasksComponent } from './view-all-user-tasks/view-all-user-tasks.component';
import { ViewAllUserTeamsComponent } from './view-all-user-teams/view-all-user-teams.component';


// services

import { ProjectsService } from './services/projects.service';
import { TasksService } from './services/tasks.service';
import { UserService } from './services/user.service';
import { TeamsService } from './services/teams.service';
import { TeamMembersComponent } from './team-members/team-members.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProjectsComponent,
    ViewProjectsComponent,
    ProjectDetailsComponent,
    TasksComponent,
    ViewAllTasksComponent,
    AddNewTaskComponent,
    TaskDetailComponent,
    AddProjectComponent,
    EditProjectComponent,
    EditTaskComponent,
    SignupComponent,
    LoginComponent,
    SidenavComponent,
    DashViewComponent,
    LandingPageComponent,
    UsersComponent,
    ProfileComponent,
    TeamComponent,
    AddNewTeamComponent,
    ViewAllTeamsComponent,
    ViewUserTeamsComponent,
    ViewEveryProjectComponent,
    ViewEveryTaskComponent,
    ViewEveryTeamComponent,
    ViewAllUserProjectsComponent,
    ViewAllUserTasksComponent,
    ViewAllUserTeamsComponent,
    TeamMembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ProjectsService,
    TasksService,
    UserService,
    TeamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
