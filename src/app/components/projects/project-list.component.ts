import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/index';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LayoutComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.isLoading.set(false);
      }
    });
  }

  onCreateNew(event: Event): void {
    event.preventDefault();
    // Navigate to create project or open modal
  }

  onDelete(id: string, event: Event): void {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.projects.update(p => p.filter(proj => proj.id !== id));
        },
        error: (err) => {
          console.error('Error deleting project:', err);
        }
      });
    }
  }
}
