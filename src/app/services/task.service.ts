import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  DashboardStats,
  OverdueTask,
  PaginatedResponse
} from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  private tasksSignal = signal<Task[]>([]);
  private currentTaskSignal = signal<Task | null>(null);

  readonly tasks = computed(() => this.tasksSignal());
  readonly currentTask = computed(() => this.currentTaskSignal());

  getTasks(projectId?: string, filters?: { status?: string; priority?: string }): Observable<Task[]> {
    let params = new HttpParams();
    if (projectId) {
      params = params.set('projectId', projectId);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.priority) {
      params = params.set('priority', filters.priority);
    }

    return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
      tap(tasks => {
        this.tasksSignal.set(tasks);
      })
    );
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      tap(task => {
        this.currentTaskSignal.set(task);
      })
    );
  }

  createTask(request: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, request).pipe(
      tap(task => {
        this.tasksSignal.update(tasks => [...tasks, task]);
      })
    );
  }

  updateTask(id: string, request: UpdateTaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, request).pipe(
      tap(task => {
        this.tasksSignal.update(tasks =>
          tasks.map(t => t.id === id ? task : t)
        );
        if (this.currentTaskSignal()?.id === id) {
          this.currentTaskSignal.set(task);
        }
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.tasksSignal.update(tasks =>
          tasks.filter(t => t.id !== id)
        );
      })
    );
  }

  getProjectTasks(projectId: string): Observable<Task[]> {
    return this.getTasks(projectId);
  }

  getUserAssignedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/assigned/me`).pipe(
      tap(tasks => {
        this.tasksSignal.set(tasks);
      })
    );
  }

  getOverdueTasks(projectId?: string): Observable<OverdueTask[]> {
    let params = new HttpParams();
    if (projectId) {
      params = params.set('projectId', projectId);
    }

    return this.http.get<OverdueTask[]>(`${this.apiUrl}/overdue`, { params });
  }

  getDashboardStats(projectId?: string): Observable<DashboardStats> {
    let params = new HttpParams();
    if (projectId) {
      params = params.set('projectId', projectId);
    }

    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`, { params });
  }

  updateTaskStatus(id: string, status: string): Observable<Task> {
    return this.updateTask(id, { status: status as any });
  }

  assignTask(id: string, userId: string): Observable<Task> {
    return this.updateTask(id, { assignedTo: userId });
  }

  unassignTask(id: string): Observable<Task> {
    return this.updateTask(id, { assignedTo: null });
  }
}
