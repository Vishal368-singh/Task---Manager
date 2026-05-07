export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  
  // API Endpoints
  endpoints: {
    auth: '/auth',
    users: '/users',
    tasks: '/tasks',
    projects: '/projects'
  },
  
  // Application Configuration
  app: {
    name: 'Task Manager',
    version: '1.0.0'
  }
};
