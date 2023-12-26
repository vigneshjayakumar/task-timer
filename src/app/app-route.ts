import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { LoginComponentComponent } from './auth/login-component/login-component.component';
import { AuthGuard } from './auth/login-component/service/auth-guard.service';

export const AppRoutes: Routes = [
  { path: 'Tasks', component: TaskListComponent },
  { path: 'edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
  { path: 'New-Task', component: TaskEditComponent, canActivate: [AuthGuard] },
  {
    path: 'start/:id',
    component: TaskTimerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Login', component: LoginComponentComponent },
  { path: '', redirectTo: 'Tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'Tasks' },
];
