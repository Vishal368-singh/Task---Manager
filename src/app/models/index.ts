// User and Authentication Models
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}



export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

// Project Models
export interface Project {
  id: string;
  name: string;
  description: string;
  owner: User;
  members: ProjectMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  userId: string;
  user?: User;
  role: ProjectRole;
  joinedAt: Date;
}

export enum ProjectRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

export interface CreateProjectRequest {
  name: string;
  description: string;
}

// Task Models
export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: User | null;
  createdBy: User;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface CreateTaskRequest {
  projectId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: Date;
  assignedTo?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
  assignedTo?: string | null;
}

// Dashboard Models
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  tasksByPriority: TaskCountByPriority;
  tasksByStatus: TaskCountByStatus;
}

export interface TaskCountByPriority {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface TaskCountByStatus {
  todo: number;
  in_progress: number;
  in_review: number;
  completed: number;
  cancelled: number;
}

export interface OverdueTask extends Task {
  daysOverdue: number;
}

// API Response Models
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
