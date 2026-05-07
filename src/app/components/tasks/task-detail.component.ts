import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/index';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  task = signal<Task | null>(null);
  taskForm!: FormGroup;
  isLoading = signal(true);
  isSaving = signal(false);

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo'],
      priority: ['medium'],
      dueDate: [null]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadTask(id);
      }
    });
  }

  private loadTask(id: string): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task.set(task);
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : null
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.isLoading.set(false);
      }
    });
  }

  onSave(): void {
    if (this.taskForm.invalid || !this.task()) return;

    this.isSaving.set(true);
    const updates = this.taskForm.value;
    
    this.taskService.updateTask(this.task()!.id, updates).subscribe({
      next: () => {
        this.isSaving.set(false);
      },
      error: (err) => {
        console.error('Error saving task:', err);
        this.isSaving.set(false);
      }
    });
  }

  onDelete(): void {
    if (!this.task()) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task()!.id).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        }
      });
    }
  }
}
