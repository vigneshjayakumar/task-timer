import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskTimerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-timer';
}
