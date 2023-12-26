import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ITaskModel {
  id: number;
  title: string;
  desc: string;
  targetTimeInHrs: number;
  takenTimeInHrs: number;
  realTime?: {
    HH: number;
    MM: number;
    SS: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskLists: ITaskModel[] = [
    {
      id: 0,
      title: 'Weather App',
      desc: 'Shows Weather of Location Based on Search.',
      takenTimeInHrs: 2,
      targetTimeInHrs: 48,
    },
    {
      id: 1,
      title: 'TO-DO App',
      desc: 'List of TO-DOs that client want to achieve.',
      takenTimeInHrs: 1,
      targetTimeInHrs: 56,
    },
    {
      id: 2,
      title: 'Weather App',
      desc: 'Shows Weather of Location Based on Search.',
      takenTimeInHrs: 2,
      targetTimeInHrs: 48,
    },
    {
      id: 3,
      title: 'Weather App',
      desc: 'Shows Weather of Location Based on Search.',
      takenTimeInHrs: 2,
      targetTimeInHrs: 48,
    },
  ];
  constructor(private http: HttpClient) {}

  getTaskList() {
    return [...this.taskLists];
  }

  addOneTaskTimer(task: {
    id: number;
    title: string;
    targetTime: number;
    desc: string;
  }) {
    let newTaskTimer: ITaskModel = {
      title: task.title,
      desc: task.desc,
      id: task.id,
      targetTimeInHrs: task.targetTime,
      takenTimeInHrs: 0,
    };
    this.taskLists.push(newTaskTimer);
    console.log(this.taskLists);
  }

  postTaskList() {}
}
