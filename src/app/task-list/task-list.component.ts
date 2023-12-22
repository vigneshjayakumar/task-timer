import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { ITaskModel, TaskService } from './task.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, NgFor],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  taskLists: ITaskModel[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskLists = this.taskService.getTaskList();
  }
}
