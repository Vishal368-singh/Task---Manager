import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { DashboardStats, OverdueTask } from '../../models/index';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly projectService = inject(ProjectService);

  stats = signal<DashboardStats | null>(null);
  overdueTasks = signal<OverdueTask[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.taskService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
      },
      error: (err) => {
        console.error('Error loading dashboard stats:', err);
      }
    });

    this.taskService.getOverdueTasks().subscribe({
      next: (tasks) => {
        this.overdueTasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading overdue tasks:', err);
        this.isLoading.set(false);
      }
    });
  }
}
