# Task Manager - Developer Quick Reference

Quick reference guide for developers working on the Task Manager project.

## 🚀 Getting Started

```bash
# Start development server
npm start

# Watch and run tests
npm test

# Build for production
npm run build

# Install new package
npm install package-name --save
```

## 📂 File Locations

| Feature | Location |
|---------|----------|
| Login | `src/app/components/auth/login.component.ts` |
| Signup | `src/app/components/auth/signup.component.ts` |
| Dashboard | `src/app/components/dashboard/dashboard.component.ts` |
| Projects List | `src/app/components/projects/project-list.component.ts` |
| Project Detail | `src/app/components/projects/project-detail.component.ts` |
| Tasks List | `src/app/components/tasks/task-list.component.ts` |
| Task Detail | `src/app/components/tasks/task-detail.component.ts` |
| Layout | `src/app/components/layout/layout.component.ts` |
| Auth Service | `src/app/services/auth.service.ts` |
| Project Service | `src/app/services/project.service.ts` |
| Task Service | `src/app/services/task.service.ts` |
| Routes | `src/app/app.routes.ts` |
| Models | `src/app/models/index.ts` |
| Guards | `src/app/guards/auth.guard.ts` |
| Interceptors | `src/app/interceptors/auth.interceptor.ts` |
| Config | `src/app/app.config.ts` |
| Environment | `src/environments/environment.ts` |

## 🔄 Component Template Patterns

### Signal Usage
```typescript
// Create signal
title = signal('Hello');

// Update signal
this.title.set('New Title');

// Update with function
this.title.update(t => t + '!');

// Read signal in template
{{ title() }}

// Computed signal
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### Using Services
```typescript
private authService = inject(AuthService);
private taskService = inject(TaskService);
```

### Control Flow
```html
@if (condition()) {
  <div>Show when true</div>
} @else {
  <div>Show when false</div>
}

@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}

@switch (status()) {
  @case ('active') {
    <span>Active</span>
  }
  @case ('inactive') {
    <span>Inactive</span>
  }
}
```

### Forms
```typescript
// Create form
form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});

// Submit
(ngSubmit)="onSubmit()"

// Validation
[class.is-invalid]="isFieldInvalid('email')"
```

## 🔗 API Integration Pattern

```typescript
// Create service
@Injectable({ providedIn: 'root' })
export class MyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/endpoint';
  private dataSignal = signal<Data[]>([]);
  readonly data = computed(() => this.dataSignal());

  getData() {
    return this.http.get<Data[]>(this.apiUrl).pipe(
      tap(data => this.dataSignal.set(data))
    );
  }
}

// Use in component
ngOnInit() {
  this.myService.getData().subscribe({
    next: (data) => console.log('Success'),
    error: (err) => console.error('Error', err)
  });
}
```

## 🛣️ Adding Routes

```typescript
// In app.routes.ts
{
  path: 'new-page',
  component: NewPageComponent,
  canActivate: [authGuard]  // Protect route
}

// In template
<a routerLink="/new-page">Link</a>
<a [routerLink]="['/detail', id]">Detail</a>
```

## 🔐 Using Auth Service

```typescript
// Check if authenticated
if (this.authService.isAuthenticated()) {
  // User is logged in
}

// Get current user
const user = this.authService.currentUser();

// Check if admin
if (this.authService.isAdmin()) {
  // User is admin
}

// Logout
this.authService.logout();
```

## 📋 Common Tasks

### Add New Component
```bash
ng generate component components/feature-name
```

Then add to routes.ts:
```typescript
{
  path: 'feature',
  component: FeatureNameComponent
}
```

### Add New Service
```bash
ng generate service services/feature-name
```

### Create Form
```typescript
constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    field: ['', Validators.required]
  });
}
```

### Make API Call
```typescript
this.service.getData().subscribe({
  next: (data) => this.data.set(data),
  error: (err) => console.error(err)
});
```

### Display List
```html
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

### Handle Loading State
```typescript
isLoading = signal(false);

ngOnInit() {
  this.isLoading.set(true);
  this.service.getData().subscribe({
    next: () => this.isLoading.set(false)
  });
}
```

### Show Error Message
```typescript
error = signal<string | null>(null);

tryAction() {
  this.service.action().subscribe({
    error: (err) => this.error.set(err.message)
  });
}
```

## 🎨 Bootstrap Classes Quick Reference

```html
<!-- Grid -->
<div class="container">
  <div class="row">
    <div class="col-md-6">Half width</div>
    <div class="col-md-6">Half width</div>
  </div>
</div>

<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger">Danger</button>

<!-- Alerts -->
<div class="alert alert-info">Info message</div>
<div class="alert alert-danger">Error message</div>
<div class="alert alert-success">Success message</div>

<!-- Cards -->
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
</div>

<!-- Forms -->
<div class="form-group mb-3">
  <label class="form-label">Label</label>
  <input type="text" class="form-control" />
</div>

<!-- Badges -->
<span class="badge bg-primary">New</span>
<span class="badge bg-danger">Critical</span>

<!-- Spinners (Loading) -->
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
```

## 📊 Component Communication

### Parent to Child
```typescript
// Parent
@Component({
  imports: [ChildComponent]
})
export class Parent {
  data = signal('from parent');
}

<!-- Parent template -->
<app-child [data]="data" />

// Child
export class Child {
  data = input<string>();
}

<!-- Child template -->
{{ data() }}
```

### Child to Parent
```typescript
// Child
export class Child {
  notify = output<string>();
  
  onClick() {
    this.notify.emit('message');
  }
}

// Parent
onChildNotify(message: string) {
  console.log(message);
}

<!-- Parent template -->
<app-child (notify)="onChildNotify($event)" />
```

## 🔍 Debugging

### Browser Console
```
F12 - Open DevTools
Ctrl+Shift+I - Open DevTools (Windows)
Cmd+Opt+I - Open DevTools (Mac)

Check:
- Console tab for errors
- Network tab for API calls
- Elements tab for HTML
- Application tab for localStorage
```

### Angular DevTools
```
Install Angular DevTools extension
- View component tree
- Inspect signals
- Check dependencies
- Debug performance
```

### Common Errors
| Error | Solution |
|-------|----------|
| Cannot find module | Check import path, verify file exists |
| Cannot read property | Check for null/undefined, use optional chaining (?.) |
| CORS error | Check backend CORS, verify API URL |
| 401 Unauthorized | Check token, verify login |
| API not responding | Check backend running, check port |

## 📦 Project Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| @angular/core | Framework | ^21 |
| @angular/forms | Forms | ^21 |
| @angular/router | Routing | ^21 |
| @angular/common | Common utilities | ^21 |
| bootstrap | UI Framework | ^5.3 |
| rxjs | Reactive | ~7.8 |

## 🔗 Useful Links

- [Angular Docs](https://angular.io)
- [Bootstrap Docs](https://getbootstrap.com)
- [Bootstrap Icons](https://icons.getbootstrap.com)
- [TypeScript Docs](https://www.typescriptlang.org)
- [NgX Docs](https://angular.io/api)

## 📋 Pre-Commit Checklist

- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Code formatted
- [ ] Tests pass
- [ ] No unused imports
- [ ] Descriptive commit message

## 🌐 Environment Variables

### Development
```
API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Production (Update before build)
```
API_URL=https://your-api.railway.app/api
NODE_ENV=production
```

Update in: `src/environments/environment.ts`

## 🚢 Deployment Checklist

- [ ] API URL updated to production
- [ ] Build passes: `npm run build`
- [ ] No errors in browser console
- [ ] All features tested
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Backend deployed
- [ ] Database set up

## 💡 Tips & Tricks

### Hot Module Replacement
- Dev server auto-reloads on file changes
- Saves state between reloads

### TypeScript Strict Mode
- Catches errors early
- Required for this project

### Angular Performance
- Use OnPush change detection
- Lazy load routes
- Use trackBy with lists

### Git Workflow
```bash
# Create branch for feature
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add my feature"

# Push to GitHub
git push origin feature/my-feature

# Create pull request on GitHub
```

## 📞 Getting Help

1. **Check documentation**
   - FRONTEND_README.md
   - BACKEND_SETUP.md
   - SETUP_GUIDE.md

2. **Search online**
   - Angular docs
   - Stack Overflow
   - GitHub issues

3. **Debug step by step**
   - Check browser console
   - Check network requests
   - Add console logs

4. **Common patterns**
   - See this quick reference
   - Check existing components
   - Follow established patterns

---

**Last Updated**: 2024
**Angular Version**: 21
**Status**: Ready for Development ✅
