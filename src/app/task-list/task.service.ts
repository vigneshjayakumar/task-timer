import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ITaskModel {
  id?: number;
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
      title: 'Weather App',
      desc: 'Shows Weather of Location Based on Search.',
      takenTimeInHrs: 2,
      targetTimeInHrs: 48,
    },
    {
      title: 'TO-DO App',
      desc: 'List of TO-DOs that client want to achieve.',
      takenTimeInHrs: 1,
      targetTimeInHrs: 56,
    },
    {
      title: 'Weather App',
      desc: 'Shows Weather of Location Based on Search.',
      takenTimeInHrs: 2,
      targetTimeInHrs: 48,
    },
    {
      title: 'Weather App',
      desc: 'Shows Weather of Location Based on Search.',
      takenTimeInHrs: 2,
      targetTimeInHrs: 48,
    },
  ];
  constructor(private http:HttpClient) {}

  getTaskList() {
    return [...this.taskLists];
  }

  postTaskList(){

  }
}
