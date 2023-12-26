import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task-list/task.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  taskForm: FormGroup;

  constructor(private taskService: TaskService) {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      targetTime: new FormControl(0, Validators.required),
    });
  }

  submitTaskTime() {
    if (!this.taskForm.valid) {
      return;
    }
    const newTaskTimer: {
      id: number;
      title: string;
      targetTime: number;
      desc: string;
    } = {
      title: this.taskForm.controls['title'].value,
      desc: this.taskForm.controls['desc'].value,
      id: Math.random(),
      targetTime: this.taskForm.controls['targetTime'].value,
    };
    this.taskService.addOneTaskTimer(newTaskTimer);
    console.log(this.taskForm.value);
  }
}
