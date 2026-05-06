# Backend User Management API Implementation Guide

This guide provides the exact API specifications and data models needed to support the frontend user management system.

## API Base URL
```
http://localhost:8000/api
```

## User Management Endpoints

### 1. Get All Users
```
GET /api/users
```

**Authentication**: Required (Admin only)

**Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "user-123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "user-456",
      "email": "jane@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "member",
      "isActive": true,
      "createdAt": "2024-01-14T14:20:00Z",
      "updatedAt": "2024-01-14T14:20:00Z"
    }
  ]
}
```

**Error Response (403 Forbidden)**:
```json
{
  "message": "Only admins can view users"
}
```

### 2. Get Single User
```
GET /api/users/{userId}
```

**Parameters**:
- `userId` (string, required) - The ID of the user to retrieve

**Authentication**: Required (Admin only)

**Response (200 OK)**:
```json
{
  "data": {
    "id": "user-123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (404 Not Found)**:
```json
{
  "message": "User not found"
}
```

### 3. Create User
```
POST /api/users
```

**Authentication**: Required (Admin only)

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "firstName": "New",
  "lastName": "User",
  "role": "member"
}
```

**Validation Rules**:
- `email`: Required, valid email format, must be unique
- `password`: Required, minimum 6 characters, should enforce strength
- `firstName`: Required, minimum 1 character, maximum 100 characters
- `lastName`: Required, minimum 1 character, maximum 100 characters
- `role`: Required, must be "admin" or "member"

**Response (201 Created)**:
```json
{
  "data": {
    "id": "user-789",
    "email": "newuser@example.com",
    "firstName": "New",
    "lastName": "User",
    "role": "member",
    "isActive": true,
    "createdAt": "2024-01-16T08:45:00Z",
    "updatedAt": "2024-01-16T08:45:00Z"
  }
}
```

**Error Response (400 Bad Request)**:
```json
{
  "message": "Email already exists"
}
```

or

```json
{
  "message": "Invalid role. Must be 'admin' or 'member'"
}
```

### 4. Update User
```
PATCH /api/users/{userId}
```

**Parameters**:
- `userId` (string, required) - The ID of the user to update

**Authentication**: Required (Admin only)

**Request Body** (all fields optional):
```json
{
  "firstName": "Updated",
  "lastName": "Name",
  "role": "admin",
  "isActive": false
}
```

**Validation Rules**:
- `firstName`: Optional, minimum 1 character, maximum 100 characters
- `lastName`: Optional, minimum 1 character, maximum 100 characters
- `role`: Optional, must be "admin" or "member"
- `isActive`: Optional, must be boolean
- `email`: Should NOT be updateable for security reasons

**Response (200 OK)**:
```json
{
  "data": {
    "id": "user-123",
    "email": "john@example.com",
    "firstName": "Updated",
    "lastName": "Name",
    "role": "admin",
    "isActive": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T09:15:00Z"
  }
}
```

**Error Response (404 Not Found)**:
```json
{
  "message": "User not found"
}
```

### 5. Delete User
```
DELETE /api/users/{userId}
```

**Parameters**:
- `userId` (string, required) - The ID of the user to delete

**Authentication**: Required (Admin only)

**Response (200 OK)**:
```json
{
  "message": "User deleted successfully"
}
```

**Error Response (404 Not Found)**:
```json
{
  "message": "User not found"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "message": "Cannot delete the last admin user"
}
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
  role ENUM('admin', 'member') NOT NULL DEFAULT 'member',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_is_active (is_active)
);
```

## Implementation Checklist

### Security:
- [ ] All endpoints require authentication (token/session validation)
- [ ] All endpoints require admin role verification
- [ ] Never expose password hash in responses
- [ ] Use HTTPS for all API calls
- [ ] Implement rate limiting on user creation
- [ ] Validate all input on server side
- [ ] Sanitize email input
- [ ] Hash passwords using bcrypt or similar
- [ ] Implement CORS properly

### Validation:
- [ ] Email format validation
- [ ] Email uniqueness validation
- [ ] Password strength validation
- [ ] Required field validation
- [ ] Role enum validation
- [ ] Prevent deleting all admin users

### Error Handling:
- [ ] Return appropriate HTTP status codes (200, 201, 400, 403, 404, 500)
- [ ] Return consistent error message format
- [ ] Log all operations (especially admin actions)
- [ ] Handle database connection errors gracefully

### Data Format:
- [ ] All responses wrapped in `{ data: ... }` format
- [ ] All timestamps in ISO 8601 format (e.g., "2024-01-15T10:30:00Z")
- [ ] Consistent field naming (camelCase in JSON)

### Additional Considerations:
- [ ] Send welcome email to newly created users with credentials
- [ ] Implement activity logging for admin actions
- [ ] Add soft delete option (for data retention)
- [ ] Consider audit trail for user modifications
- [ ] Implement pagination for large user lists
- [ ] Add filtering/sorting capabilities

## Example Implementation (Node.js/Express)

```typescript
// user.controller.ts
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { authMiddleware, adminMiddleware } from './middleware';

export class UserController {
  private userService = new UserService();

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ data: users });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ data: user });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, role } = req.body;
      
      // Validation
      if (!email || !password || !firstName || !lastName || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newUser = await this.userService.createUser({
        email,
        password,
        firstName,
        lastName,
        role
      });

      res.status(201).json({ data: newUser });
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedUser = await this.userService.updateUser(id, req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

// user.routes.ts
import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware, adminMiddleware } from './middleware';

const router = Router();
const controller = new UserController();

// All routes require auth and admin role
router.use(authMiddleware, adminMiddleware);

router.get('/', (req, res) => controller.getAllUsers(req, res));
router.get('/:id', (req, res) => controller.getUserById(req, res));
router.post('/', (req, res) => controller.createUser(req, res));
router.patch('/:id', (req, res) => controller.updateUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

export default router;
```

## Testing

### Test Cases:

1. **Create User**:
   - ✓ Create user with all valid fields
   - ✓ Reject duplicate email
   - ✓ Reject invalid email format
   - ✓ Reject weak password
   - ✓ Reject invalid role

2. **List Users**:
   - ✓ Return all users
   - ✓ Include all required fields
   - ✓ No passwords in response

3. **Update User**:
   - ✓ Update user role
   - ✓ Update user status
   - ✓ Prevent email change
   - ✓ Require admin role

4. **Delete User**:
   - ✓ Delete user successfully
   - ✓ Prevent deleting last admin
   - ✓ Return 404 for non-existent user

5. **Access Control**:
   - ✓ Reject non-authenticated requests
   - ✓ Reject non-admin authenticated requests
   - ✓ Allow admin requests
