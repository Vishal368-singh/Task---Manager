import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project, Task, TaskStatus } from '../../models/index';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);

  project = signal<Project | null>(null);
  tasks = signal<Task[]>([]);
  activeTab = signal<'tasks' | 'members'>('tasks');
  isLoading = signal(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(id);
      }
    });
  }

  private loadProject(id: string): void {
    this.projectService.getProject(id).subscribe({
      next: () => {
        this.loadProjectTasks(id);
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.isLoading.set(false);
      }
    });
  }

  private loadProjectTasks(projectId: string): void {
    this.taskService.getProjectTasks(projectId).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading.set(false);
      }
    });
  }

  onCreateTask(): void {
    // Navigate to create task or open modal
  }

  onStatusChange(taskId: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;

    this.taskService.updateTaskStatus(taskId, newStatus).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(t =>
            t.id === taskId ? { ...t, status: newStatus as TaskStatus } : t
          )
        );
      },
      error: (err) => {
        console.error('Error updating task status:', err);
      }
    });
  }

  onRemoveMember(userId: string): void {
    const projectId = this.project()?.id;
    if (!projectId) return;

    if (confirm('Remove this member from the project?')) {
      this.projectService.removeMember(projectId, userId).subscribe({
        next: () => {
          this.project.update(p => {
            if (!p) return p;
            return {
              ...p,
              members: p.members.filter(m => m.userId !== userId)
            };
          });
        },
        error: (err) => {
          console.error('Error removing member:', err);
        }
      });
    }
  }
}
