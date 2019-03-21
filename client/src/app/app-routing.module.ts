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

const routes: Routes = [
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
        // Route for adding new projects
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
    // Route for dashboard
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
