import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';

export const AppRoutes: Routes = [
  { path: 'Tasks', component: TaskListComponent },
  { path: 'edit/:id', component: TaskEditComponent },
  { path: 'New-Task', component: TaskEditComponent },
  { path: 'start/:id', component: TaskTimerComponent },
  { path: '', redirectTo: 'Tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'Tasks' },
];
