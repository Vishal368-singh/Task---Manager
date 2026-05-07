import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { User, SignupRequest, LoginRequest } from '../models/index';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiService = inject(ApiService);
  private readonly authEndpoint = environment.endpoints.auth;

  private readonly currentUserSignal = signal<User | null>(null);
  private readonly tokenSignal = signal<string | null>(null);

  readonly currentUser = computed(() => this.currentUserSignal());
  readonly token = computed(() => this.tokenSignal());
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());
  readonly userRole = computed(() => this.currentUserSignal()?.role || null);

  constructor() {}


  signup(request: SignupRequest) {
    return this.apiService.post(`${this.authEndpoint}/signup`, request).pipe(
      tap(response => this.setAuthState(response)),
      catchError(error => {
        console.error('[AuthService] Signup error:', error);
        throw error;
      })
    );
  }

  login(request: LoginRequest) {
    return this.apiService.post(`${this.authEndpoint}/login`, request).pipe(
      tap(response => this.setAuthState(response)),
      catchError(error => {
        console.error('[AuthService] Login error:', error);
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
    return this.apiService.get<User>(`${this.authEndpoint}/me`).pipe(
      tap(user => {
        this.currentUserSignal.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  refreshToken() {
    return this.apiService.post(`${this.authEndpoint}/refresh`, {}).pipe(
      tap(response => this.setAuthState(response))
    );
  }

  private setAuthState(response: any): void {
    this.tokenSignal.set(response.data.accessToken);
    this.currentUserSignal.set(response.data.user);
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data.user || '{}'));
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}
