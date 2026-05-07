import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/index';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  isLoading = signal(true);
  searchTerm = '';
  filterStatus = '';
  filterPriority = '';

  get filteredTasks(): () => Task[] {
    return () => {
      return this.tasks().filter(task => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
        const matchesStatus = !this.filterStatus || task.status === this.filterStatus;
        const matchesPriority =
          !this.filterPriority || task.priority === this.filterPriority;

        return matchesSearch && matchesStatus && matchesPriority;
      });
    };
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.taskService.getUserAssignedTasks().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading.set(false);
      }
    });
  }

  onCreateNew(): void {
    // Navigate to create task or open modal
  }
}
