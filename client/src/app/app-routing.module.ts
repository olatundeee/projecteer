import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import required components
import { AddProjectComponent } from './add-project/add-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TasksComponent } from './tasks/tasks.component';
import { ViewAllTasksComponent } from './view-all-tasks/view-all-tasks.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashViewComponent } from './dash-view/dash-view.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
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
import { TeamMembersComponent } from './team-members/team-members.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

// import route guard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    // Router for app landing page
    path: '',
    component: LandingPageComponent
  },
  {
    // Route for logging in a user in to the dashboard area
    path: 'login',
    component: LoginComponent
  },
  {
    // Route for registering a new user
    path: 'register',
    component: SignupComponent
  },
  {
    // Route for dashboard
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        // Route to dashboard view
        path: '',
        component: DashViewComponent
      },
      {
        // Route to view all added projects by all users
        path: 'view-every-project',
        component: ViewEveryProjectComponent
      },
      {
        // Route to view all added tasks by all users
        path: 'view-every-task',
        component: ViewEveryTaskComponent
      },
      {
        // Route to view all added teams by all users
        path: 'view-every-team',
        component: ViewEveryTeamComponent
      },
      {
        // Route to view all added projects by one particular user
        path: 'view-all-user-projects',
        component: ViewAllUserProjectsComponent
      },
      {
        // Route to view all added tasks by one user
        path: 'view-all-user-tasks',
        component: ViewAllUserTasksComponent
      },
      {
        // Route to view all added teams by one particular user
        path: 'view-all-user-teams',
        component: ViewAllTeamsComponent
      },
      {
        // Route for all relating to projects
        path: 'projects',
        component: ProjectsComponent,
        children: [
          {
            // Route for viewing existing projects
            path: '',
            component: ViewProjectsComponent
          },
          {
            // Route for adding new projects\
            path: 'add-project',
            component: AddProjectComponent
          },
          {
            // Route for viewing existing project details
            path: 'project-details',
            component: ProjectDetailsComponent
          },
          {
            // Route for editing project details
            path: 'edit-project',
            component: EditProjectComponent
          }
        ]
      },
      {
        // Route for all relating to project tasks
        path: 'tasks',
        component: TasksComponent,
        children: [
          {
            // Route for viewing all tasks for currently active projects
            path: '',
            component: ViewAllTasksComponent
          },
          {
            // Route for adding a new task to existing projects
            path: 'add-new-task',
            component: AddNewTaskComponent
          },
          {
            // Route for viewing details of an existing task
            path: 'task-detail',
            component: TaskDetailComponent
          },
          {
            // Route for editing an existing task data
            path: 'edit-task',
            component: EditTaskComponent
          }
        ]
      },
      {
        path: 'teams',
        component: TeamComponent,
        children: [
          {
            path: '',
            component: ViewUserTeamsComponent
          },
          {
            path: 'add-new-team',
            component: AddNewTeamComponent
          },
          {
            path: 'all-teams',
            component: ViewAllTeamsComponent
          },
          {
            path: 'team-members',
            component: TeamMembersComponent
          }
        ]
      },
      {
        // Route for viewing user information and data
        path: 'users',
        component: UsersComponent,
        children: [
          {
            // Route for viewing list of users
            path: '',
            component: UserListComponent
          },
          {
            // Route for viewing user profile
            path: 'profile',
            component: ProfileComponent
          },
          {
            // Route for adding user profile
            path: 'add-profile',
            component: AddProfileComponent
          },
          {
            // Route for editing user profile
            path: 'edit-profile',
            component: EditProfileComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
