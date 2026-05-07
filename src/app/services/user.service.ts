import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/index';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiService = inject(ApiService);
  private readonly usersEndpoint = environment.endpoints.users;

  // Get all users
  getAllUsers(): Observable<{ data: User[] }> {
    return this.apiService.get<{ data: User[] }>(this.usersEndpoint);
  }

  // Get user by ID
  getUserById(id: string): Observable<{ data: User }> {
    return this.apiService.get<{ data: User }>(`${this.usersEndpoint}/${id}`);
  }

  // Create new user
  createUser(request: CreateUserRequest): Observable<{ data: User }> {
    return this.apiService.post<{ data: User }>(this.usersEndpoint, request);
  }

  // Update user
  updateUser(id: string, request: UpdateUserRequest): Observable<{ data: User }> {
    return this.apiService.patch<{ data: User }>(`${this.usersEndpoint}/${id}`, request);
  }

  // Delete user
  deleteUser(id: string): Observable<{ message: string }> {
    return this.apiService.delete<{ message: string }>(`${this.usersEndpoint}/${id}`);
  }

  // Activate/Deactivate user
  toggleUserStatus(id: string, isActive: boolean): Observable<{ data: User }> {
    return this.apiService.patch<{ data: User }>(`${this.usersEndpoint}/${id}`, { isActive });
  }

  // Get team members
  getTeamMembers(): Observable<{ data: User[] }> {
    return this.apiService.get<{ data: User[] }>(`${this.usersEndpoint}/team/members`);
  }

  // Assign role to user
  assignRole(id: string, role: 'admin' | 'member'): Observable<{ data: User }> {
    return this.apiService.patch<{ data: User }>(`${this.usersEndpoint}/${id}`, { role });
  }
}
