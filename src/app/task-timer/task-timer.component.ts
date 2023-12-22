import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITaskModel } from '../task-list/task.service';
import { Observable, Subject, takeUntil, tap, timer } from 'rxjs';

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

  min: number = 0;
  sec: number = 0;
  hr: number = 0;

  task: ITaskModel = {
    title: 'Weather App',
    desc: "Let's Roll",
    takenTimeInHrs: 48,
    targetTimeInHrs: 2,
    realTime: {
      HH: this.hr,
      MM: this.min,
      SS: this.sec,
    },
  };

  onStartWatch() {
    this.isStart = true;

    this.timer$ = timer(0, 1000).pipe(
      tap((s) => {
        if (this.sec < 60 && this.isStart) {
          this.sec = this.sec + 1;
        } else if (this.sec >= 60) {
          this.sec = this.sec % 60;
          if (this.min < 60) {
            this.min += 1;
            this.sec = 0;
            console.log('SEC', this.sec);
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
    // this.stop$.next(true);
  }
}
