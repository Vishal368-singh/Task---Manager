# Task Manager Backend Setup Guide

This guide provides instructions for setting up the backend API for the Task Manager application.

## Overview

The Task Manager requires a REST API backend that handles:
- User authentication and authorization
- Project management
- Task management
- Role-based access control

## Tech Stack Recommendations

### Option 1: Node.js + Express
- **Framework**: Express.js
- **Database**: MongoDB (NoSQL) or PostgreSQL (SQL)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi or Zod
- **ORM**: Mongoose (MongoDB) or TypeORM/Sequelize (SQL)

### Option 2: Python + FastAPI
- **Framework**: FastAPI
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT
- **Validation**: Pydantic
- **ORM**: SQLAlchemy or Motor

### Option 3: .NET Core
- **Framework**: ASP.NET Core
- **Database**: SQL Server or PostgreSQL
- **Authentication**: JWT
- **ORM**: Entity Framework Core

## API Endpoints Required

### Authentication Endpoints
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/me
POST   /api/auth/logout
```

### Project Endpoints
```
GET    /api/projects              - Get all projects
GET    /api/projects/:id          - Get project by ID
POST   /api/projects              - Create project
PUT    /api/projects/:id          - Update project
DELETE /api/projects/:id          - Delete project
GET    /api/projects/:id/tasks    - Get project tasks
POST   /api/projects/:id/members  - Add member to project
DELETE /api/projects/:id/members/:userId - Remove member
PUT    /api/projects/:id/members/:userId  - Update member role
```

### Task Endpoints
```
GET    /api/tasks                  - Get all tasks
GET    /api/tasks/:id              - Get task by ID
POST   /api/tasks                  - Create task
PUT    /api/tasks/:id              - Update task
DELETE /api/tasks/:id              - Delete task
GET    /api/tasks/assigned/me      - Get user's assigned tasks
GET    /api/tasks/overdue          - Get overdue tasks
GET    /api/tasks/stats            - Get dashboard statistics
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'member') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

### Project Members Table
```sql
CREATE TABLE project_members (
  id VARCHAR(36) PRIMARY KEY,
  project_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role ENUM('admin', 'member') DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id VARCHAR(36) PRIMARY KEY,
  project_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('todo', 'in_progress', 'in_review', 'completed', 'cancelled') DEFAULT 'todo',
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  assigned_to VARCHAR(36),
  created_by VARCHAR(36) NOT NULL,
  due_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

## Request/Response Format

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt-token>
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    /* response data */
  }
}
```

### Error Response (400/401/500)
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [ /* array of items */ ],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  }
}
```

## Authentication Flow

### Signup
```
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "member",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### Login
```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: (Same as signup)
```

### Refresh Token
```
POST /api/auth/refresh
(Send with Authorization header containing old token)

Response: (Returns new token)
```

## Validation Rules

### User Registration
- Email: Valid email format, unique
- Password: Minimum 6 characters
- First Name: Required, 1-100 characters
- Last Name: Required, 1-100 characters

### Project Creation
- Name: Required, 1-255 characters
- Description: Optional, max 1000 characters

### Task Creation
- Project ID: Required, must exist
- Title: Required, 1-255 characters
- Description: Optional
- Priority: one of [low, medium, high, critical]
- Status: Default to 'todo'
- Due Date: Optional, must be future date
- Assigned To: Optional, must be project member

## Deployment Notes

### Environment Variables
```
NODE_ENV=production
PORT=3000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secure-secret>
JWT_EXPIRY=24h
CORS_ORIGIN=<frontend-url>
```

### CORS Configuration
```javascript
// Must allow frontend URL
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));
```

### Security Best Practices
1. Hash passwords with bcrypt (salt rounds: 10+)
2. Use HTTPS in production
3. Implement rate limiting
4. Validate all inputs
5. Use prepared statements for SQL
6. Implement request logging
7. Set secure HTTP headers
8. Validate JWT tokens properly

## Error Codes

Common error codes to implement:

```
INVALID_CREDENTIALS - Login failed
USER_EXISTS - Email already registered
USER_NOT_FOUND - User doesn't exist
INVALID_TOKEN - JWT token invalid
TOKEN_EXPIRED - JWT token expired
PROJECT_NOT_FOUND - Project doesn't exist
TASK_NOT_FOUND - Task doesn't exist
UNAUTHORIZED - User not authorized for action
VALIDATION_ERROR - Input validation failed
INTERNAL_ERROR - Server error
```

## Testing the API

### Using cURL

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123",
    "firstName":"Test",
    "lastName":"User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'

# Get projects (with auth)
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer <token>"
```

### Using Postman
1. Create new collection
2. Set up environment variables for base URL and token
3. Create requests for each endpoint
4. Use pre-request script to refresh tokens if needed

## Sample Express.js Backend

Here's a basic structure to get started:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware for JWT verification
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token' });
  
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/signup', async (req, res) => {
  // Implementation
});

app.post('/api/auth/login', async (req, res) => {
  // Implementation
});

app.get('/api/projects', authMiddleware, async (req, res) => {
  // Implementation
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Next Steps

1. Choose a backend framework
2. Set up database
3. Implement authentication
4. Create API endpoints
5. Add validation and error handling
6. Deploy to Railway
7. Configure CORS for frontend
8. Test all endpoints
9. Deploy frontend with correct API URL

## Support & Resources

- Express.js: https://expressjs.com
- FastAPI: https://fastapi.tiangolo.com
- ASP.NET Core: https://docs.microsoft.com/aspnet/core
- JWT: https://jwt.io
- Railway: https://railway.app
