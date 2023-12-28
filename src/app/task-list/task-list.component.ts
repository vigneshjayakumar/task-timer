import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { TaskItemComponent } from './task-item/task-item.component';
import { ITaskModel, TaskService } from './task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskLists: ITaskModel[] = [];
  constructor(private taskService: TaskService) {}

  taskList$: Observable<ITaskModel[]> = this.taskService.getTaskListFromDB();
}
