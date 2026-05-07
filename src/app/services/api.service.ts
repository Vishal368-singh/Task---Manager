import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Centralized API Service for all HTTP requests
 * This service provides a single point for API communication
 * All API calls should go through this service for easier debugging and tracking
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly http = inject(HttpClient);
  readonly baseUrl = environment.apiUrl;

  /**
   * Generic GET request
   * @param endpoint - API endpoint path (e.g., '/users', '/tasks/1')
   * @param params - Optional HTTP parameters
   */
  get<T>(endpoint: string, params?: HttpParams | Record<string, any>): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[API] GET: ${url}`);
    return this.http.get<T>(url, { params });
  }

  /**
   * Generic POST request
   * @param endpoint - API endpoint path
   * @param body - Request payload
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[API] POST: ${url}`, body);
    return this.http.post<T>(url, body);
  }

  /**
   * Generic PATCH request
   * @param endpoint - API endpoint path
   * @param body - Request payload
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[API] PATCH: ${url}`, body);
    return this.http.patch<T>(url, body);
  }

  /**
   * Generic PUT request
   * @param endpoint - API endpoint path
   * @param body - Request payload
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[API] PUT: ${url}`, body);
    return this.http.put<T>(url, body);
  }

  /**
   * Generic DELETE request
   * @param endpoint - API endpoint path
   */
  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[API] DELETE: ${url}`);
    return this.http.delete<T>(url);
  }

  /**
   * Build HTTP parameters from object
   */
  buildParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return httpParams;
  }
}
