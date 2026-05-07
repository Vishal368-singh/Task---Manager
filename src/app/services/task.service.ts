import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  DashboardStats,
  OverdueTask
} from '../models/index';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiService = inject(ApiService);
  private readonly tasksEndpoint = environment.endpoints.tasks;

  private readonly tasksSignal = signal<Task[]>([]);
  private readonly currentTaskSignal = signal<Task | null>(null);

  readonly tasks = computed(() => this.tasksSignal());
  readonly currentTask = computed(() => this.currentTaskSignal());

  getTasks(projectId?: string, filters?: { status?: string; priority?: string }): Observable<Task[]> {
    const params: Record<string, any> = {};
    if (projectId) params['projectId'] = projectId;
    if (filters?.status) params['status'] = filters['status'];
    if (filters?.priority) params['priority'] = filters['priority'];

    const httpParams = Object.keys(params).length > 0 ? this.apiService.buildParams(params) : undefined;
    return this.apiService.get<Task[]>(this.tasksEndpoint, httpParams).pipe(
      tap(tasks => this.tasksSignal.set(tasks))
    );
  }

  getTask(id: string): Observable<Task> {
    return this.apiService.get<Task>(`${this.tasksEndpoint}/${id}`).pipe(
      tap(task => this.currentTaskSignal.set(task))
    );
  }

  createTask(request: CreateTaskRequest): Observable<Task> {
    return this.apiService.post<Task>(this.tasksEndpoint, request).pipe(
      tap(task => this.tasksSignal.update(tasks => [...tasks, task]))
    );
  }

  updateTask(id: string, request: UpdateTaskRequest): Observable<Task> {
    return this.apiService.patch<Task>(`${this.tasksEndpoint}/${id}`, request).pipe(
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
    return this.apiService.delete<void>(`${this.tasksEndpoint}/${id}`).pipe(
      tap(() => this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id)))
    );
  }

  getProjectTasks(projectId: string): Observable<Task[]> {
    return this.getTasks(projectId);
  }

  getUserAssignedTasks(): Observable<Task[]> {
    return this.apiService.get<Task[]>(`${this.tasksEndpoint}/assigned/me`).pipe(
      tap(tasks => this.tasksSignal.set(tasks))
    );
  }

  getOverdueTasks(projectId?: string): Observable<OverdueTask[]> {
    const params = projectId ? this.apiService.buildParams({ projectId }) : undefined;
    return this.apiService.get<OverdueTask[]>(`${this.tasksEndpoint}/overdue`, params);
  }

  getDashboardStats(projectId?: string): Observable<DashboardStats> {
    const params = projectId ? this.apiService.buildParams({ projectId }) : undefined;
    return this.apiService.get<DashboardStats>(`${this.tasksEndpoint}/stats`, params);
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
