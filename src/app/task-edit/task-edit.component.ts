import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription,  tap } from 'rxjs';

import { ITaskModel, TaskService } from '../task-list/task.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnDestroy {
  taskForm: FormGroup;
  isEdit: boolean = false;
  index!: number;
  editTask!: ITaskModel;
  saveTask!: Subscription;

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap
      .pipe(
        tap((params) => {
          if (params.get('id')) {
            this.index = +params.get('id')!;
          }
          if (this.index !== undefined) {
            this.isEdit = true;
            this.editTask = this.taskService.getOneTask(this.index);
          } else {
            this.isEdit = false;
          }
        })
      )
      .subscribe();
    if (this.isEdit === false) {
      this.taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
        desc: new FormControl('', Validators.required),
        targetTime: new FormControl(0, Validators.required),
      });
    } else {
      this.taskForm = new FormGroup({
        title: new FormControl(this.editTask.title, Validators.required),
        desc: new FormControl(this.editTask.desc, Validators.required),
        targetTime: new FormControl(
          this.editTask.targetTimeInHrs,
          Validators.required
        ),
      });
    }
  }

  submitTaskTime() {
    if (!this.taskForm.valid) {
      return;
    }

    const newTaskTimer: ITaskModel = {
      title: this.taskForm.controls['title'].value,
      desc: this.taskForm.controls['desc'].value,
      id: Math.floor(1000 + Math.random() * 9000),
      targetTimeInHrs: this.taskForm.controls['targetTime'].value,
      takenTimeInHrs: this.isEdit ? this.editTask.takenTimeInHrs : 0,
      realTime: {
        HH: 0,
        MM: 0,
        SS: 0,
      },
    };
    if (this.isEdit) {
      this.taskService.replaceTask(newTaskTimer, this.index);
      this.saveTask = this.taskService.saveTaskToDataBase().subscribe();
      this.router.navigate([''], { relativeTo: this.activatedRoute });
      return;
    }
    this.taskService.addOneTaskTimer(newTaskTimer);
    this.saveTask = this.taskService.saveTaskToDataBase().subscribe();
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    if (this.saveTask) {
      this.saveTask.unsubscribe();
    }
  }
}
