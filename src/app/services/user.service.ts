import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/users';

  // Get all users
  getAllUsers(): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}`);
  }

  // Get user by ID
  getUserById(id: string): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`);
  }

  // Create new user
  createUser(request: CreateUserRequest): Observable<{ data: User }> {
    return this.http.post<{ data: User }>(`${this.apiUrl}`, request);
  }

  // Update user
  updateUser(id: string, request: UpdateUserRequest): Observable<{ data: User }> {
    return this.http.patch<{ data: User }>(`${this.apiUrl}/${id}`, request);
  }

  // Delete user
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Activate/Deactivate user
  toggleUserStatus(id: string, isActive: boolean): Observable<{ data: User }> {
    return this.http.patch<{ data: User }>(`${this.apiUrl}/${id}`, { isActive });
  }

  // Get team members
  getTeamMembers(): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}/team/members`);
  }

  // Assign role to user
  assignRole(id: string, role: 'admin' | 'member'): Observable<{ data: User }> {
    return this.http.patch<{ data: User }>(`${this.apiUrl}/${id}`, { role });
  }
}
