import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';
import { TaskService } from './task-list/task.service';
import { AuthService } from './auth/login-component/service/auth.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.authService.autoLogIn();
    this.taskService
      .getTaskListFromDB()
      .pipe(tap((s) => console.log(s)))
      .subscribe();
  }

  mainList() {
    this.router.navigate(['/Tasks'], { relativeTo: this.route });
  }

  addNew() {
    this.router.navigate(['/New-Task'], { relativeTo: this.route });
  }

  saveToDataBase() {
    this.taskService.saveTaskToDataBase().pipe(tap(console.log)).subscribe();
  }

  logOut() {
    this.authService.logOut();
  }
}
