import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITaskModel } from '../task-list/task.service';

@Component({
  selector: 'app-task-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.css'],
})
export class TaskTimerComponent {
  task: ITaskModel = {
    title: 'Weather App',
    desc: "Let's Roll",
    takenTimeInHrs: 48,
    targetTimeInHrs: 2,
  };
}
