# 🚀 Task Manager Pro - Complete Setup & API Guide

A modern, professional task management application built with Angular 21, featuring centralized API management, role-based access control, and responsive design.

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [API Service Architecture](#-api-service-architecture)
3. [Environment Configuration](#-environment-configuration)
4. [Navigation Guide](#-navigation-guide)
5. [Project Structure](#-project-structure)
6. [Features](#-features)

---

## 🚀 Quick Start

### Prerequisites
```bash
- Node.js 18+
- npm or yarn
- Angular CLI 21
```

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Application runs on
http://localhost:4200
```

### Build & Deployment

```bash
# Build for production
npm run build

# Output: dist/ folder ready for deployment
```

---

## 🏗️ API Service Architecture

### Centralized API Service Pattern

All HTTP requests now go through the **`ApiService`** for better debugging, tracking, and maintainability.

**File:** `src/app/services/api.service.ts`

#### Benefits:
✅ Single point for API communication  
✅ Easy debugging with console logging  
✅ Centralized error handling  
✅ Request/response intercepting  
✅ Environment-based configuration  
✅ Type-safe HTTP methods  

#### API Service Methods:

```typescript
// GET Request
apiService.get<T>(endpoint: string, params?: HttpParams): Observable<T>

// POST Request
apiService.post<T>(endpoint: string, body: any): Observable<T>

// PATCH Request
apiService.patch<T>(endpoint: string, body: any): Observable<T>

// PUT Request
apiService.put<T>(endpoint: string, body: any): Observable<T>

// DELETE Request
apiService.delete<T>(endpoint: string): Observable<T>

// Build HTTP Parameters
apiService.buildParams(params: Record<string, any>): HttpParams
```

### Updated Services Using ApiService:

1. **AuthService** (`src/app/services/auth.service.ts`)
   - Signup, Login, Logout
   - Token management
   - Role-based access

2. **UserService** (`src/app/services/user.service.ts`)
   - User CRUD operations
   - Team member management
   - Role assignment

3. **TaskService** (`src/app/services/task.service.ts`)
   - Task management with filters
   - Dashboard statistics
   - Overdue task tracking

4. **ProjectService** (`src/app/services/project.service.ts`)
   - Project management
   - Team member assignment
   - Project-specific tasks

---

## ⚙️ Environment Configuration

### File Structure:

```
src/environments/
├── environment.ts       (Development config)
└── environment.prod.ts  (Production config)
```

### Environment Configuration:

```typescript
// src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',  // Main API URL
  
  // API Endpoints
  endpoints: {
    auth: '/auth',
    users: '/users',
    tasks: '/tasks',
    projects: '/projects'
  },
  
  // Application Configuration
  app: {
    name: 'Task Manager Pro',
    version: '1.0.0'
  }
};
```

### How to Use:

```typescript
import { environment } from '../../environments/environment';

export class SomeService {
  private apiService = inject(ApiService);
  private endpoint = environment.endpoints.users;
  
  getUsers() {
    return this.apiService.get(this.endpoint);
  }
}
```

---

## 🧭 Navigation Guide

### Clean Navigation Structure

The application provides intuitive navigation with clear pathways:

#### 1. **Main Navigation Items:**

- **Dashboard** (`/dashboard`)
  - Overview of all tasks
  - Statistics and metrics
  - Quick actions

- **Projects** (`/projects`)
  - View all projects
  - Create new projects
  - Manage team members

- **Tasks** (`/tasks`)
  - Your assigned tasks
  - Filter by status/priority
  - View task details

- **Admin Panel** (`/admin`) - *Admin Only*
  - Manage users
  - Assign roles
  - System settings

#### 2. **User Profile Menu:**

- User name and role display
- Quick logout option
- Responsive dropdown menu

#### 3. **Breadcrumb Navigation:**

- Shows current page context
- Quick navigation to parent sections
- Available on desktop devices

### Navigation Flow:

```
Login
  ↓
Dashboard (Home)
  ├→ Projects (Create/Edit/Manage)
  │   └→ Project Details (Tasks, Members)
  ├→ Tasks (View/Filter/Create)
  │   └→ Task Details (Edit/Update Status)
  └→ Admin (User Management) [Admin Only]
        └→ User List (Create/Edit/Delete)
```

### Returning to Navigation:

✅ **From any page:** Click "Dashboard" in navbar  
✅ **From any page:** Click "Task Manager Pro" logo  
✅ **Automatic:** Mobile menu closes after selection  
✅ **Breadcrumbs:** Click "Home" to return to dashboard  

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── admin/              # Admin management components
│   │   ├── auth/               # Login/Signup components
│   │   ├── dashboard/          # Dashboard component
│   │   ├── layout/             # Layout & Navigation
│   │   │   ├── layout.component.ts
│   │   │   ├── layout.component.html  ✨ MODERNIZED
│   │   │   └── layout.component.css   ✨ MODERNIZED
│   │   ├── projects/           # Project management
│   │   └── tasks/              # Task management
│   ├── guards/                 # Route guards
│   ├── interceptors/           # HTTP interceptors
│   ├── models/                 # Type definitions
│   ├── services/
│   │   ├── api.service.ts      ✨ NEW - Centralized API
│   │   ├── auth.service.ts     ✅ Updated
│   │   ├── user.service.ts     ✅ Updated
│   │   ├── task.service.ts     ✅ Updated
│   │   └── project.service.ts  ✅ Updated
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts          ✅ Updated
│   └── environment.prod.ts
└── main.ts
```

---

## ✨ Features

### 🔐 Authentication & Security

- User registration and login
- JWT token-based authentication
- Role-based access control (Admin/Member)
- Automatic session management
- Secure token refresh

### 📊 Dashboard

- Real-time task statistics
- Tasks by priority and status
- Overdue task tracking
- Visual metrics
- Quick action access

### 👥 Project Management

- Create and manage projects
- Add team members with roles
- Assign tasks to team members
- Track project progress

### ✅ Task Management

- Create, edit, and delete tasks
- Filter tasks by status, priority, assignee
- Set due dates and reminders
- Track task progress
- Assign to team members

### 🎨 User Interface

- Modern, professional design
- Responsive layout (Mobile, Tablet, Desktop)
- Intuitive navigation
- Smooth animations
- Accessibility features (WCAG compliant)

### 🔧 Developer Experience

- Centralized API service
- Environment-based configuration
- Console logging for all API calls
- Type-safe services
- Easy-to-track debugging
- Organized code structure

---

## 🛠️ Debugging & Tracking

### Console Logging

All API calls are logged to the browser console for easy debugging:

```
[API] GET: http://localhost:8000/api/users
[API] POST: http://localhost:8000/api/tasks { title: "New Task" }
[API] PATCH: http://localhost:8000/api/tasks/1 { status: "completed" }
[API] DELETE: http://localhost:8000/api/users/1
```

### Network Tab

Check the **Network** tab in DevTools to:
- Monitor all API requests
- View response times
- Check response payloads
- Debug authentication issues

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `api.service.ts` | Centralized HTTP service |
| `environment.ts` | Configuration & endpoints |
| `layout.component.*` | Modern navigation & UI |
| `auth.service.ts` | Authentication logic |
| `user.service.ts` | User management |
| `task.service.ts` | Task operations |
| `project.service.ts` | Project operations |

---

## 🚀 Deployment

For Railway deployment, see `RAILWAY_DEPLOYMENT.md`

---

## 📝 Notes

- All API URLs are configured in `environment.ts`
- Services communicate through the centralized `ApiService`
- Mobile menu automatically closes when navigating
- Breadcrumb navigation helps context awareness
- Admin features are role-based and secured

---

## 💡 Tips for Development

1. **Always use the `ApiService`** for HTTP calls
2. **Check environment.ts** before hardcoding URLs
3. **Use browser DevTools** to track API requests
4. **Test responsive design** on multiple devices
5. **Check console logs** for API debugging
6. **Use proper TypeScript types** for all services

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Support:** Check console logs and network tab for debugging
