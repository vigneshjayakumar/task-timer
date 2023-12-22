import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone:true,
  imports:[TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
