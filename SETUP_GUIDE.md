# Task Manager - Complete Project Setup Guide

This guide covers the complete setup and development of the Task Manager application.

## Project Overview

**Task Manager** is a full-stack web application for team collaboration and task management with:
- User authentication and authorization
- Project management with role-based access
- Task creation, assignment, and tracking
- Real-time dashboard with statistics
- Team collaboration features

## Tech Stack

### Frontend (Complete)
- **Framework**: Angular 21
- **Language**: TypeScript 5.9
- **State**: Angular Signals
- **Forms**: Reactive Forms
- **HTTP**: HttpClient with Interceptors
- **Routing**: Angular Router with Guards
- **UI**: Bootstrap 5 + Bootstrap Icons
- **Package Manager**: npm

### Backend (To be implemented)
- **Framework**: Node.js + Express (or your choice)
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT
- **API Style**: RESTful
- **Deployment**: Railway

## Project Structure

```
task-manager/
├── src/
│   ├── app/
│   │   ├── components/           # All components
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   ├── projects/
│   │   │   └── tasks/
│   │   ├── services/             # API services
│   │   │   ├── auth.service.ts
│   │   │   ├── project.service.ts
│   │   │   └── task.service.ts
│   │   ├── guards/               # Route guards
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/         # HTTP interceptors
│   │   │   └── auth.interceptor.ts
│   │   ├── models/               # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── app.routes.ts         # Application routes
│   │   ├── app.config.ts         # App configuration
│   │   └── app.ts                # Root component
│   ├── environments/             # Environment config
│   │   └── environment.ts
│   ├── index.html                # HTML template
│   ├── main.ts                   # Bootstrap
│   └── styles.css                # Global styles
├── angular.json                  # Angular config
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── FRONTEND_README.md            # Frontend docs
├── BACKEND_SETUP.md              # Backend docs
└── RAILWAY_DEPLOYMENT.md         # Deployment docs
```

## Getting Started

### Prerequisites

```bash
# Check versions
node --version        # v18+ required
npm --version         # v10+ required
ng version           # Angular CLI
```

### Local Development Setup

1. **Clone and Install**
   ```bash
   cd task-manager
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   - Frontend: http://localhost:4200
   - Must have backend running on http://localhost:3000

3. **Open in Browser**
   - Navigate to http://localhost:4200
   - Login or sign up to test

### Verify Installation

```bash
# Check all dependencies installed
npm list

# Run tests (if configured)
npm test

# Build for production
npm run build
```

## Frontend Development

### Key Technologies

#### Angular 21 Features
- Standalone Components (no NgModules)
- Signals for state management
- Control flow (@if, @for, @switch)
- Typed Reactive Forms
- Standalone routing

#### Project Organization
- **Components**: UI and views
- **Services**: Business logic and API calls
- **Guards**: Route protection
- **Interceptors**: HTTP request/response handling
- **Models**: Type definitions

### Adding New Features

#### Example: Create a new component

```bash
# Create component files
ng generate component components/new-feature

# This creates:
# - new-feature.component.ts (standalone component)
# - new-feature.component.html
# - new-feature.component.css
# - new-feature.component.spec.ts
```

#### Example: Component template

```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>{{ title() }}</h1>
      @if (isLoading()) {
        <div>Loading...</div>
      } @else {
        <div>{{ data() }}</div>
      }
    </div>
  `,
  styles: []
})
export class FeatureComponent {
  title = signal('Feature Title');
  isLoading = signal(false);
  data = signal('Feature Data');
}
```

### Service Development

Example service following best practices:

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MyService {
  private http = inject(HttpClient);
  private dataSignal = signal<any[]>([]);
  
  readonly data = this.dataSignal.asReadonly();

  getData() {
    return this.http.get('/api/data').subscribe(
      data => this.dataSignal.set(data)
    );
  }
}
```

## Backend Implementation

### Backend Setup (Do This Next)

The frontend expects these API endpoints:

**Authentication:**
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
GET  /api/auth/me
```

**Projects:**
```
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
POST   /api/projects/:id/members
DELETE /api/projects/:id/members/:userId
PUT    /api/projects/:id/members/:userId
```

**Tasks:**
```
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/assigned/me
GET    /api/tasks/overdue
GET    /api/tasks/stats
```

### Backend Tech Stack Recommendations

**Option 1: Node.js + Express (Easiest)**
- Express.js for HTTP server
- Mongoose (MongoDB) or Sequelize (PostgreSQL)
- JWT for authentication
- See `BACKEND_SETUP.md` for detailed guide

**Option 2: Python + FastAPI**
- FastAPI for async REST API
- SQLAlchemy for ORM
- Pydantic for validation

**Option 3: .NET Core**
- ASP.NET Core for REST API
- Entity Framework Core
- Built-in authentication

### Starting Backend Development

1. **Create new folder**: `mkdir task-manager-backend`
2. **Choose tech stack** from recommendations above
3. **Follow BACKEND_SETUP.md** for detailed guide
4. **Implement database schema**
5. **Create API endpoints**
6. **Add validation and error handling**
7. **Test with Postman**
8. **Update frontend API URL** to backend URL

## Testing

### Frontend Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Manual Testing Checklist

- [ ] Sign up with new email
- [ ] Login with credentials
- [ ] Create new project
- [ ] Add member to project
- [ ] Create task in project
- [ ] Update task status
- [ ] View dashboard
- [ ] Filter tasks
- [ ] Delete task
- [ ] Logout

## Building for Production

### Build Process

```bash
# Create production build
npm run build

# Output: dist/task-manager/browser/
```

### Build Optimization

- Tree shaking enabled
- AOT compilation
- Code minification
- CSS minification
- Lazy loading

### Verify Build

```bash
# Test production build locally
npx http-server dist/task-manager/browser

# Open http://localhost:8080
```

## Deployment

### Deploy Frontend to Railway

See `RAILWAY_DEPLOYMENT.md` for complete guide.

```bash
# 1. Build production version
npm run build

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 3. Deploy on Railway (see docs)
# Build: npm run build
# Start: npx http-server dist/task-manager/browser -p $PORT
```

### Deploy Backend to Railway

See `RAILWAY_DEPLOYMENT.md` for complete guide.

## Environment Configuration

### Development

`src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Production

Update before building:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend.railway.app/api'
};
```

## Development Workflow

### Daily Development

```bash
# 1. Start development server
npm start

# 2. Make changes to components/services
# 3. See hot reload in browser (automatic)
# 4. Test in browser (F12 for DevTools)
# 5. Commit changes
git add .
git commit -m "Describe changes"
git push
```

### Component Development Flow

1. Create component with `ng generate`
2. Design template in component file
3. Add component logic with services
4. Style with CSS in component
5. Test in browser
6. Add to routes if needed
7. Commit to git

### Service Development Flow

1. Create interface/model in `models/index.ts`
2. Inject HttpClient in service
3. Implement methods for API calls
4. Use signals for state management
5. Test with real API or mock
6. Import in components
7. Commit to git

## Common Development Tasks

### Add New Route

```typescript
// In app.routes.ts
{
  path: 'new-page',
  component: NewPageComponent,
  canActivate: [authGuard]
}
```

### Add New API Service

```typescript
// services/my-api.service.ts
@Injectable({ providedIn: 'root' })
export class MyApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/endpoint';

  getItems() {
    return this.http.get<Item[]>(this.apiUrl);
  }
}
```

### Use Service in Component

```typescript
export class MyComponent {
  private apiService = inject(MyApiService);
  items = signal<Item[]>([]);

  ngOnInit() {
    this.apiService.getItems().subscribe(
      items => this.items.set(items)
    );
  }
}
```

## Debugging

### Browser DevTools

```
F12 - Open DevTools
Ctrl+Shift+I - Open DevTools (Windows)
Cmd+Opt+I - Open DevTools (Mac)
```

### Check Console for Errors

- Network errors (API calls)
- Component errors
- TypeScript errors
- CORS issues

### Debug API Calls

1. Open DevTools → Network tab
2. Make API call
3. Click request
4. View Request/Response
5. Check Headers and Payload

### Common Errors

**"Cannot find module"**
- Check import path
- Verify file exists
- Restart dev server

**"Cannot read property of undefined"**
- Check object initialization
- Use safe navigation (?.)
- Check null values

**"CORS error"**
- Verify backend CORS config
- Check API URL in environment.ts
- Ensure backend is running

## Best Practices

### Code Style

- Use signals instead of properties
- Use computed() for derived state
- Use inject() for dependencies
- Type everything with TypeScript
- Use interfaces for models
- Keep components small

### Performance

- Use OnPush change detection
- Lazy load feature modules
- Use trackBy in *ngFor
- Unsubscribe from observables
- Use async pipe with observables

### Security

- Validate inputs
- Sanitize user data
- Use HTTPS in production
- Store tokens securely
- Don't expose secrets

### Testing

- Write unit tests
- Test user flows
- Test API integration
- Handle errors
- Mock external services

## File Naming Conventions

- Components: `feature.component.ts`
- Services: `feature.service.ts`
- Guards: `feature.guard.ts`
- Models: Use interfaces in `models/index.ts`
- Styles: `feature.component.css` (in same folder)

## Useful Commands

```bash
# Development
npm start              # Start dev server
npm test              # Run tests
npm run build         # Production build

# Angular CLI
ng generate component components/name
ng generate service services/name
ng generate guard guards/name

# Git
git status            # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit
git push             # Push to GitHub
git pull             # Pull latest

# Other
npm install          # Install dependencies
npm update           # Update packages
npm audit            # Check security issues
```

## Getting Help

1. **Check documentation**
   - `FRONTEND_README.md` - Frontend docs
   - `BACKEND_SETUP.md` - Backend guide
   - `RAILWAY_DEPLOYMENT.md` - Deployment

2. **Browser Console**
   - F12 to open DevTools
   - Check error messages
   - Look at Network tab

3. **Angular Documentation**
   - https://angular.io
   - https://angular.dev

4. **TypeScript Documentation**
   - https://www.typescriptlang.org

5. **Stack Overflow**
   - Tag with `angular` and `typescript`

## Troubleshooting

### Dev server won't start
```bash
# Kill all node processes
pkill -f node

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Start again
npm start
```

### Module not found
```bash
# Check file exists
# Verify import path
# Check tsconfig.json paths

# Restart dev server
npm start
```

### CORS error
```bash
# Check backend has CORS enabled
# Verify API URL matches backend
# Check backend is running
# Look at backend CORS configuration
```

## Next Steps

1. ✅ Frontend is ready
2. ⏭️ Implement Backend (use BACKEND_SETUP.md)
3. ⏭️ Test all endpoints with Postman
4. ⏭️ Deploy frontend to Railway
5. ⏭️ Deploy backend to Railway
6. ⏭️ Update frontend API URL
7. ⏭️ Test live application
8. ⏭️ Monitor logs and performance

## Project Milestones

- [x] Frontend setup with Angular 21
- [x] Authentication components created
- [x] Dashboard implemented
- [x] Project management UI
- [x] Task management UI
- [x] Routing and guards configured
- [x] Services and HTTP setup
- [ ] Backend development
- [ ] Database setup
- [ ] API endpoints implementation
- [ ] Integration testing
- [ ] Railway deployment
- [ ] Production optimization
- [ ] Monitoring and logging

## Support & Contact

For detailed information see:
- Frontend: `FRONTEND_README.md`
- Backend: `BACKEND_SETUP.md`
- Deployment: `RAILWAY_DEPLOYMENT.md`

---

**Happy coding! Start building your Task Manager application! 🚀**
