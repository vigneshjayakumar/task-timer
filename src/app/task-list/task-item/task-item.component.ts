import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITaskModel } from '../task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: ITaskModel;
}
