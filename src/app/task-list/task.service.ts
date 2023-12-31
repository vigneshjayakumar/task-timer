import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';

export interface ITaskModel {
  id: number;
  title: string;
  desc: string;
  targetTimeInHrs: number;
  takenTimeInHrs: number;
  realTime: {
    HH: number;
    MM: number;
    SS: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskLists: ITaskModel[] = [];
  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getToken()._token
    ),
  };

  constructor(private http: HttpClient) {}

  getToken() {
    return JSON.parse(localStorage.getItem('UserInfo')!);
  }

  getTaskList() {
    return [...this.taskLists];
  }

  getOneTask(id: number) {
    let taskFound = this.taskLists.findIndex((s) => s.id === id);
    return this.taskLists[taskFound];
  }

  saveTaskToDataBase() {
    return this.http.put(
      `https://points-tracker-22d69-default-rtdb.asia-southeast1.firebasedatabase.app/tastTimer.json`,
      this.taskLists
    );
  }

  getTaskListFromDB() {
    return this.http
      .get<ITaskModel[]>(
        `https://points-tracker-22d69-default-rtdb.asia-southeast1.firebasedatabase.app/tastTimer.json`
      )
      .pipe(tap((taskLists) => (this.taskLists = taskLists)));
  }

  addOneTaskTimer(task: ITaskModel) {
    let newTaskTimer: ITaskModel = {
      title: task.title,
      desc: task.desc,
      id: task.id,
      targetTimeInHrs: task.targetTimeInHrs,
      takenTimeInHrs: 0,
      realTime: {
        HH: 0,
        MM: 0,
        SS: 0,
      },
    };
    this.taskLists.push(newTaskTimer);
    this.saveTaskToDataBase().subscribe();
  }

  replaceTask(task: ITaskModel, id: number) {
    let newTaskTimer: ITaskModel = {
      title: task.title,
      desc: task.desc,
      id: task.id,
      targetTimeInHrs: task.targetTimeInHrs,
      takenTimeInHrs: task.takenTimeInHrs,
      realTime: {
        HH: 0,
        MM: 0,
        SS: 0,
      },
    };
    let taskFound = this.taskLists.findIndex((task) => task.id === id);
    if (taskFound !== null) {
      this.taskLists[taskFound] = newTaskTimer;
    }
    this.saveTaskToDataBase().subscribe();
  }

  postTaskList() {}
}
