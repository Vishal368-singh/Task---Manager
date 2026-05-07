import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Project, CreateProjectRequest } from '../models/index';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly apiService = inject(ApiService);
  private readonly projectsEndpoint = environment.endpoints.projects;

  private readonly projectsSignal = signal<Project[]>([]);
  private readonly currentProjectSignal = signal<Project | null>(null);

  readonly projects = computed(() => this.projectsSignal());
  readonly currentProject = computed(() => this.currentProjectSignal());

  getProjects(): Observable<Project[]> {
    return this.apiService.get<Project[]>(this.projectsEndpoint).pipe(
      tap(projects => this.projectsSignal.set(projects))
    );
  }

  getProject(id: string): Observable<Project> {
    return this.apiService.get<Project>(`${this.projectsEndpoint}/${id}`).pipe(
      tap(project => this.currentProjectSignal.set(project))
    );
  }

  createProject(request: CreateProjectRequest): Observable<Project> {
    return this.apiService.post<Project>(this.projectsEndpoint, request).pipe(
      tap(project => this.projectsSignal.update(projects => [...projects, project]))
    );
  }

  updateProject(id: string, request: Partial<CreateProjectRequest>): Observable<Project> {
    return this.apiService.patch<Project>(`${this.projectsEndpoint}/${id}`, request).pipe(
      tap(project => {
        this.projectsSignal.update(projects =>
          projects.map(p => p.id === id ? project : p)
        );
        if (this.currentProjectSignal()?.id === id) {
          this.currentProjectSignal.set(project);
        }
      })
    );
  }

  deleteProject(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.projectsEndpoint}/${id}`).pipe(
      tap(() => this.projectsSignal.update(projects => projects.filter(p => p.id !== id)))
    );
  }

  addMember(projectId: string, userId: string, role: string): Observable<Project> {
    return this.apiService.post<Project>(
      `${this.projectsEndpoint}/${projectId}/members`,
      { userId, role }
    ).pipe(
      tap(project => {
        this.currentProjectSignal.set(project);
        this.projectsSignal.update(projects =>
          projects.map(p => p.id === projectId ? project : p)
        );
      })
    );
  }

  removeMember(projectId: string, userId: string): Observable<Project> {
    return this.apiService.delete<Project>(
      `${this.projectsEndpoint}/${projectId}/members/${userId}`
    ).pipe(
      tap(project => {
        this.currentProjectSignal.set(project);
        this.projectsSignal.update(projects =>
          projects.map(p => p.id === projectId ? project : p)
        );
      })
    );
  }

  updateMemberRole(projectId: string, userId: string, role: string): Observable<Project> {
    return this.apiService.patch<Project>(
      `${this.projectsEndpoint}/${projectId}/members/${userId}`,
      { role }
    ).pipe(
      tap(project => {
        this.currentProjectSignal.set(project);
        this.projectsSignal.update(projects =>
          projects.map(p => p.id === projectId ? project : p)
        );
      })
    );
  }
}
