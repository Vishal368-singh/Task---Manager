import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login.component';
import { SignupComponent } from './components/auth/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectListComponent } from './components/projects/project-list.component';
import { ProjectDetailComponent } from './components/projects/project-detail.component';
import { TaskListComponent } from './components/tasks/task-list.component';
import { TaskDetailComponent } from './components/tasks/task-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [publicGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: ':id',
        component: ProjectDetailComponent
      }
    ]
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: TaskListComponent
      },
      {
        path: ':id',
        component: TaskDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
