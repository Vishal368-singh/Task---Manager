import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError } from 'rxjs';
import { User, SignupRequest, LoginRequest } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/auth';

  private currentUserSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);

  readonly currentUser = computed(() => this.currentUserSignal());
  readonly token = computed(() => this.tokenSignal());
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());
  readonly userRole = computed(() => this.currentUserSignal()?.role || null);

  constructor() {
    // this.initializeFromStorage();
  }

  // private initializeFromStorage(): void {
  //   const token = localStorage.getItem('token');
  //   const user = localStorage.getItem('user');
    
  //   if (token && user) {
  //     this.tokenSignal.set(token);
  //     this.currentUserSignal.set(JSON.parse(user));
  //   }
  // }

  signup(request: SignupRequest) {
    return this.http.post(`${this.apiUrl}/signup`, request).pipe(
      tap(response => {
        this.setAuthState(response);
      }),
      catchError(error => {
        console.error('Signup error:', error);
        throw error;
      })
    );
  }

  login(request: LoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        this.setAuthState(response);
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUserSignal.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  refreshToken() {
    return this.http.post(`${this.apiUrl}/refresh`, {}).pipe(
      tap(response => {
        this.setAuthState(response);
      })
    );
  }

  private setAuthState(response:any): void {
    const data = response;
    this.tokenSignal.set(response.data.accessToken);
    this.currentUserSignal.set(response.data.user);
    localStorage.setItem('token', data.data.accessToken);
    localStorage.setItem('user', JSON.stringify(data?.data?.user || '{}'));
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}
