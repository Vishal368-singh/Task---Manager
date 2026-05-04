# TaskManager

# 🚀 Team Task Manager - Full Stack Application

A comprehensive web application for team collaboration and task management with role-based access control, built with Angular 21 on the frontend and designed for deployment on Railway.

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Key Features

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
- Visual metrics and charts
- Quick action access

### 👥 Project Management
- Create and manage projects
- Add team members with roles
- Assign project roles (Admin/Member)
- View project overview
- Manage project members

### ✅ Task Management
- Create and assign tasks
- Update task status
- Set task priority levels
- Define due dates
- Filter and search tasks
- Track task progress

### 🌐 Team Collaboration
- Team member management
- Task assignment and tracking
- Project-based organization
- Member role management
- Activity tracking

## 🛠️ Tech Stack

### Frontend (Complete)
- **Angular 21** - Latest Angular framework
- **TypeScript 5.9** - Type-safe JavaScript
- **Angular Signals** - Reactive state management
- **Reactive Forms** - Advanced form handling
- **Angular Router** - Application routing
- **Bootstrap 5** - Responsive UI
- **HttpClient** - API communication

### Backend (To be implemented)
- **Node.js/Express** or framework of choice
- **PostgreSQL/MongoDB** - Database
- **JWT** - Authentication
- **Railway** - Deployment platform

## 📁 Project Structure

```
task-manager/
├── src/
│   ├── app/
│   │   ├── components/        # All UI components
│   │   ├── services/          # API services
│   │   ├── guards/            # Route guards
│   │   ├── interceptors/      # HTTP interceptors
│   │   ├── models/            # TypeScript interfaces
│   │   ├── app.routes.ts      # Route configuration
│   │   ├── app.config.ts      # Application config
│   │   └── app.ts             # Root component
│   ├── environments/          # Environment config
│   ├── index.html             # HTML entry
│   ├── main.ts                # Bootstrap
│   └── styles.css             # Global styles
├── FRONTEND_README.md         # Frontend documentation
├── BACKEND_SETUP.md           # Backend setup guide
├── RAILWAY_DEPLOYMENT.md      # Deployment guide
└── SETUP_GUIDE.md             # Complete setup guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 10+
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd task-manager

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at http://localhost:4200

### First Time Setup

1. **Frontend is ready** ✅
2. **Backend development** - See [BACKEND_SETUP.md](./BACKEND_SETUP.md)
3. **Testing** - Test all features locally
4. **Deployment** - See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete project setup and development guide
- **[FRONTEND_README.md](./FRONTEND_README.md)** - Frontend architecture and API integration
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Backend implementation guide
- **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)** - Deployment instructions

## 🎯 Features Overview

### Dashboard Features
```
✅ Task count statistics
✅ Completed tasks tracking
✅ In-progress tasks view
✅ Overdue tasks alert
✅ Tasks by priority breakdown
✅ Tasks by status breakdown
✅ Real-time updates
```

### Project Management
```
✅ Create projects
✅ Manage team members
✅ Assign roles
✅ Remove members
✅ Update member roles
✅ View project details
✅ Delete projects
```

### Task Management
```
✅ Create tasks
✅ Assign to users
✅ Set priority
✅ Update status
✅ Set due dates
✅ Filter by status
✅ Filter by priority
✅ Search tasks
✅ Delete tasks
```

### Authentication
```
✅ User registration
✅ User login
✅ Token refresh
✅ Session management
✅ Role-based access
✅ Protected routes
```

## 📱 Components

### Authentication Components
- **LoginComponent** - User login interface
- **SignupComponent** - User registration

### Main Components
- **DashboardComponent** - Dashboard overview
- **LayoutComponent** - Main navigation layout

### Project Components
- **ProjectListComponent** - List all projects
- **ProjectDetailComponent** - Project details and tasks

### Task Components
- **TaskListComponent** - User's task list
- **TaskDetailComponent** - Task details and editing

## 🔧 Services

- **AuthService** - Authentication management
- **ProjectService** - Project API calls
- **TaskService** - Task API calls

## 🛡️ Guards & Interceptors

- **authGuard** - Protect authenticated routes
- **publicGuard** - Protect login/signup pages
- **AuthInterceptor** - Add JWT tokens to requests

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Bootstrap 5** - Modern, clean interface
- **Bootstrap Icons** - Professional icons
- **Intuitive Navigation** - Easy to use
- **Form Validation** - Real-time validation
- **Loading States** - User feedback
- **Error Handling** - Clear error messages
- **Dark Mode Ready** - Modern styling

## 🚢 Deployment

### Deploy Frontend
```bash
npm run build
# Deploy dist/task-manager/browser/ to Railway
```

### Deploy Backend
```bash
# Push to GitHub
git push origin main
# Railway auto-deploys from GitHub
```

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed steps.

## 📊 API Endpoints Required

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`

### Projects
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/projects/:id/members`
- `DELETE /api/projects/:id/members/:userId`

### Tasks
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/tasks/assigned/me`
- `GET /api/tasks/overdue`
- `GET /api/tasks/stats`

## 🧪 Testing

```bash
# Run tests
npm test

# Build for production
npm run build

# Start dev server
npm start
```

## 📝 Environment Configuration

### Development
```
API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Production
```
API_URL=https://your-backend.railway.app/api
NODE_ENV=production
```

## 🔒 Security Features

- ✅ JWT authentication
- ✅ HTTPS enforcement
- ✅ CORS configuration
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection ready
- ✅ Rate limiting ready
- ✅ Secure token storage

## 🎓 Learning Resources

### Angular
- [Angular Documentation](https://angular.io)
- [Angular DevTools](https://developer.chrome.com/docs/devtools/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Bootstrap
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

### Railway
- [Railway Documentation](https://docs.railway.app)

## 🐛 Troubleshooting

### Dev Server Issues
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm start
```

### API Connection
- Verify backend is running on correct port
- Check API URL in environment.ts
- Check CORS configuration on backend

### Build Issues
```bash
npm run build -- --verbose
```

See detailed troubleshooting in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 📈 Performance

- ✅ Production build optimization
- ✅ Lazy loading support
- ✅ Tree shaking enabled
- ✅ AOT compilation
- ✅ Code splitting
- ✅ Minified bundles
- ✅ Gzip compression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - See LICENSE file for details

## 🎯 Roadmap

- [x] Frontend setup
- [x] Authentication UI
- [x] Dashboard
- [x] Project management UI
- [x] Task management UI
- [ ] Backend development
- [ ] Database setup
- [ ] API endpoints
- [ ] Integration testing
- [ ] Railway deployment
- [ ] Performance monitoring
- [ ] Advanced features

## 👥 Team

Developed for full-stack web development assignment.

## 📞 Support

For detailed information:
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for setup
- See [FRONTEND_README.md](./FRONTEND_README.md) for frontend docs
- See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for backend
- See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for deployment

## 🌟 Key Highlights

✨ **Modern Angular 21** - Latest features and best practices
✨ **Signals API** - Reactive and performant state management
✨ **Standalone Components** - Simplified architecture
✨ **Responsive Design** - Works on all devices
✨ **Role-Based Access** - Admin and member roles
✨ **Full Feature Set** - Complete task management
✨ **Production Ready** - Optimized for deployment
✨ **Well Documented** - Comprehensive guides

---

**Start building your Task Manager today! 🚀**

For questions or issues, refer to the documentation files in the project.

**Status**: Frontend Ready ✅ | Backend Ready ⏳ | Deployment Ready 🚀


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
