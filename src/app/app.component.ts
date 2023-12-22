import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskTimerComponent, NgIf, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isMenu: boolean = true;
  title = 'task-timer';

  constructor(private router: Router, private route: ActivatedRoute) {}

  mainList() {
    this.router.navigate(['/Tasks'], { relativeTo: this.route });
  }
}
