import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Project, CreateProjectRequest, ProjectMember } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/projects';

  private projectsSignal = signal<Project[]>([]);
  private currentProjectSignal = signal<Project | null>(null);

  readonly projects = computed(() => this.projectsSignal());
  readonly currentProject = computed(() => this.currentProjectSignal());

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      tap(projects => {
        this.projectsSignal.set(projects);
      })
    );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      tap(project => {
        this.currentProjectSignal.set(project);
      })
    );
  }

  createProject(request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, request).pipe(
      tap(project => {
        this.projectsSignal.update(projects => [...projects, project]);
      })
    );
  }

  updateProject(id: string, request: Partial<CreateProjectRequest>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, request).pipe(
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
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.projectsSignal.update(projects =>
          projects.filter(p => p.id !== id)
        );
      })
    );
  }

  addMember(projectId: string, userId: string, role: string): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiUrl}/${projectId}/members`,
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
    return this.http.delete<Project>(
      `${this.apiUrl}/${projectId}/members/${userId}`
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
    return this.http.put<Project>(
      `${this.apiUrl}/${projectId}/members/${userId}`,
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
