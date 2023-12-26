import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITaskModel } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: ITaskModel;

  constructor(private router: Router, private route: ActivatedRoute) {}

  selectTile(index: number) {
    this.router.navigate(['/edit/', index], { relativeTo: this.route });
  }

  runTile(index: number) {
    this.router.navigate(['/start', index], { relativeTo: this.route });
  }
}
