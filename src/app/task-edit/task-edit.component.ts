import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  taskForm: FormGroup;

  constructor() {
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
    console.log(this.taskForm.value);
  }
}
