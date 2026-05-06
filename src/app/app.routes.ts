import { Routes } from '@angular/router';
import { authGuard, publicGuard, adminGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login.component';
import { SignupComponent } from './components/auth/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectListComponent } from './components/projects/project-list.component';
import { ProjectDetailComponent } from './components/projects/project-detail.component';
import { TaskListComponent } from './components/tasks/task-list.component';
import { TaskDetailComponent } from './components/tasks/task-detail.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { UserListComponent } from './components/admin/user-list.component';
import { UserFormComponent } from './components/admin/user-form.component';

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
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/create',
        component: UserFormComponent
      },
      {
        path: 'users/:id/edit',
        component: UserFormComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
