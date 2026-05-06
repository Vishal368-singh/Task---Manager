import { Component, inject, signal, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User, UserRole } from '../../models/index';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  users = signal<User[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');

  filteredUsers = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.users().filter(user =>
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || 'Failed to load users');
        console.error('Error loading users:', err);
      }
    });
  }

  editUser(userId: string): void {
    this.router.navigate(['/admin/users', userId, 'edit']);
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users.set(this.users().filter(u => u.id !== userId));
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Failed to delete user');
        }
      });
    }
  }

  toggleUserStatus(user: User): void {
    const newStatus = !user.isActive;
    const action = newStatus ? 'activate' : 'deactivate';

    if (confirm(`Are you sure you want to ${action} this user?`)) {
      this.userService.toggleUserStatus(user.id, newStatus).subscribe({
        next: (response) => {
          const index = this.users().findIndex(u => u.id === user.id);
          if (index !== -1) {
            const updatedUsers = [...this.users()];
            updatedUsers[index] = response.data;
            this.users.set(updatedUsers);
          }
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Failed to update user status');
        }
      });
    }
  }

  assignRole(user: User): void {
    const newRole = user.role === UserRole.ADMIN ? UserRole.MEMBER : UserRole.ADMIN;
    const roleText = newRole === UserRole.ADMIN ? 'admin' : 'member';

    if (confirm(`Are you sure you want to assign ${roleText} role to this user?`)) {
      this.userService.assignRole(user.id, newRole).subscribe({
        next: (response) => {
          const index = this.users().findIndex(u => u.id === user.id);
          if (index !== -1) {
            const updatedUsers = [...this.users()];
            updatedUsers[index] = response.data;
            this.users.set(updatedUsers);
          }
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Failed to update user role');
        }
      });
    }
  }

  clearError(): void {
    this.error.set(null);
  }

  UserRole = UserRole;
}
