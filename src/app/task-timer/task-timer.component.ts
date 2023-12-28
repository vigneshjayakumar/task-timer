import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil, tap, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ITaskModel, TaskService } from '../task-list/task.service';

@Component({
  selector: 'app-task-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.css'],
})
export class TaskTimerComponent {
  timer$!: Observable<number>;
  stop$ = new Subject<boolean>();
  isStart: boolean = false;
  index!: number;

  min: number = 0;
  sec: number = 0;
  hr: number = 0;

  task: ITaskModel = {
    id: 0,
    title: '',
    desc: '',
    takenTimeInHrs: 0,
    targetTimeInHrs: 0,
    realTime: {
      HH: this.hr,
      MM: this.min,
      SS: this.sec,
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.activatedRoute.paramMap
      .pipe(
        tap((params) => {
          this.index = +params.get('id')!;
          if (this.index !== undefined) {
            const taskOne: ITaskModel = this.taskService.getOneTask(this.index);
            let hrMM = taskOne.takenTimeInHrs.toString().split('.');
            this.hr = isNaN(+hrMM[0]) ? 0 : +hrMM[0];
            this.min = isNaN(+hrMM[1]) ? 0 : +hrMM[1];
            this.task = {
              title: taskOne.title,
              desc: taskOne.desc,
              id: taskOne.id,
              takenTimeInHrs: taskOne.takenTimeInHrs,
              targetTimeInHrs: taskOne.targetTimeInHrs,
              realTime: {
                HH: this.hr,
                MM: this.min,
                SS: 0,
              },
            };
          }
        })
      )
      .subscribe();
  }

  onStartWatch() {
    this.isStart = true;

    this.timer$ = timer(0, 1000).pipe(
      tap((s) => {
        if (this.sec < 59 && this.isStart) {
          this.sec = this.sec + 1;
        } else if (this.sec >= 59) {
          this.sec = this.sec % 60;
          if (this.min < 59) {
            this.min += 1;
            this.sec = 0;
          } else {
            this.hr += 1;
            this.min = 0;
            this.sec = 0;
          }
        }
        this.task.realTime = {
          HH: this.hr,
          MM: this.min,
          SS: this.sec,
        };
      }),
      takeUntil(this.stop$)
    );
  }

  onPauseWatch() {
    this.isStart = false;
    if (this.hr === 0) {
      this.task.takenTimeInHrs = +(this.min / 100).toFixed(2);
    } else {
      this.task.takenTimeInHrs += +(this.min / 100).toFixed(2);
    }
    this.taskService.replaceTask(this.task, this.task.id);
  }
}
