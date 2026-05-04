# Team Task Manager Frontend

A comprehensive task management application with role-based access control, real-time collaboration, and team project management built with Angular 21.

## Features

### 🔐 Authentication & Authorization
- User signup and login with email/password
- JWT token-based authentication
- Role-based access control (Admin/Member)
- Persistent session management
- Automatic token refresh

### 📋 Project Management
- Create and manage projects
- Add team members to projects
- Assign project roles (Admin/Member)
- View project details and members
- Delete projects (Admin only)

### ✅ Task Management
- Create, update, and delete tasks
- Assign tasks to team members
- Track task status (To Do, In Progress, In Review, Completed, Cancelled)
- Set task priority levels (Low, Medium, High, Critical)
- Set due dates for tasks
- Filter tasks by status and priority
- Search tasks by title

### 📊 Dashboard
- Overall task statistics
- Task count by priority
- Task count by status
- Overdue tasks tracking
- Real-time data visualization
- Quick access to important metrics

### 👥 Team Collaboration
- View all project members
- Remove members from projects
- Update member roles
- Track task assignments
- Monitor project progress

## Tech Stack

- **Framework**: Angular 21 (Latest)
- **Language**: TypeScript 5.9
- **Styling**: Bootstrap 5.3 + CSS
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient
- **Forms**: Reactive Forms
- **Routing**: Angular Router
- **Icons**: Bootstrap Icons

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login.component.ts
│   │   │   └── signup.component.ts
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts
│   │   ├── layout/
│   │   │   └── layout.component.ts
│   │   ├── projects/
│   │   │   ├── project-list.component.ts
│   │   │   └── project-detail.component.ts
│   │   └── tasks/
│   │       ├── task-list.component.ts
│   │       └── task-detail.component.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   └── task.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── models/
│   │   └── index.ts
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.ts
├── environments/
│   └── environment.ts
└── main.ts
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 10+
- Angular CLI 21

### Steps

1. **Install dependencies**
```bash
npm install
```

2. **Update API endpoint**
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Change if needed
};
```

3. **Start development server**
```bash
npm start
```

The application will be available at `http://localhost:4200`

4. **Build for production**
```bash
npm run build
```

## Architecture & Best Practices

### Standalone Components
All components are built as standalone Angular components, following the Angular 21 best practices:
- No NgModule decorators
- Self-contained imports
- Simpler dependency tree

### Signals for State Management
- Local component state using `signal()`
- Derived state with `computed()`
- Signal updates with `set()` and `update()`
- Reactive and efficient UI updates

### Services
- Singleton services with `providedIn: 'root'`
- Injected via `inject()` function
- Structured around single responsibility
- Observable-based async operations

### Authentication Flow
1. User logs in/signs up
2. Server returns JWT token + user info
3. Token stored in localStorage
4. Interceptor adds token to all API requests
5. Token automatically refreshed on expiration
6. Protected routes guarded by `authGuard`

### Guards
- **authGuard**: Protects authenticated routes
- **publicGuard**: Prevents logged-in users from accessing login/signup
- **roleGuard**: Can be extended for role-specific routes

## API Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members/:userId` - Remove member
- `PUT /api/projects/:id/members/:userId` - Update member role

### Tasks
- `GET /api/tasks` - List tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/assigned/me` - Get user's assigned tasks
- `GET /api/tasks/overdue` - Get overdue tasks
- `GET /api/tasks/stats` - Get dashboard statistics

## Response Format

All API responses should follow this format:

```typescript
// Success
{
  success: true,
  data: { /* response data */ }
}

// Error
{
  success: false,
  error: "error code",
  message: "error message"
}
```

## Models & Interfaces

All TypeScript models are defined in `src/app/models/index.ts`:

- **User** - User profile information
- **AuthResponse** - Login/signup response
- **Project** - Project information
- **Task** - Task details
- **DashboardStats** - Statistics for dashboard
- **TaskStatus** - Enum for task statuses
- **TaskPriority** - Enum for task priorities

## Security

- JWT token-based authentication
- Token stored in localStorage (consider secure storage for production)
- HTTPS recommended for production
- CORS properly configured on backend
- Role-based access control (RBAC)
- Input validation on forms
- Authorization guards on routes

## Deployment

### Prerequisites for Railway Deployment
1. Backend API deployed and running
2. Frontend built for production
3. Backend CORS configured for frontend URL

### Deploy Frontend to Railway

1. **Create Railway project**
```bash
railway init
```

2. **Configure build**
- Build command: `npm run build`
- Start command: `npx http-server dist/task-manager/browser -p $PORT`
- Root directory: `.`

3. **Set environment variables**
```
NODE_ENV=production
API_URL=<your-backend-api-url>
```

4. **Deploy**
```bash
railway deploy
```

5. **Update environment configuration**
Before building, update `src/environments/environment.ts` with production API URL

## Development Server

To start the development server with live reload:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Testing

```bash
npm run test
```

Run unit tests using Vitest and Jasmine.

## Building

```bash
npm run build
```

Builds the project in the `dist/` directory for production deployment.

## Environment Configuration

### Development
- Base URL: `http://localhost:4200`
- API URL: `http://localhost:3000/api`

### Production
- Update API URL in `src/environments/environment.ts`
- Build with production flag

## Troubleshooting

### Authentication Issues
- Clear browser cache and localStorage
- Verify backend API is running
- Check CORS configuration on backend
- Ensure token format is correct

### API Connection Issues
- Verify backend URL in environment.ts
- Check backend is running on correct port
- Verify CORS headers

### UI Not Loading
- Check browser console for errors
- Verify Bootstrap CSS is loaded
- Check that components are properly imported

## Future Enhancements

- Real-time notifications
- File attachments for tasks
- Task comments and discussions
- Advanced filtering and sorting
- Gantt chart view
- Calendar view
- Team workload analysis
- Performance optimization
- Accessibility improvements
- Mobile app version

## Contributing

Guidelines for contributing:
1. Follow Angular best practices
2. Use standalone components
3. Add type safety
4. Test before pushing
5. Write clear commit messages

## License

MIT License - Feel free to use this template for your projects!

## Support

For issues and questions, please check:
1. Browser console for error messages
2. Backend API logs
3. Network tab in DevTools
4. This documentation

---

**Built with Angular 21** ❤️
