import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly mobileMenuOpen = signal(false);
  readonly currentRoute = signal<string>('');
  readonly breadcrumbLabel = computed(() => {
    const route = this.currentRoute();

    if (route.startsWith('/admin/users')) {
      return 'User Management';
    }

    if (route.startsWith('/admin')) {
      return 'Admin';
    }

    if (route.startsWith('/projects')) {
      return 'Projects';
    }

    if (route.startsWith('/tasks')) {
      return 'Tasks';
    }

    const normalized = route.slice(1).replaceAll('-', ' ');
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  });

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.urlAfterRedirects);
        this.mobileMenuOpen.set(false);
      });
  }

  toggleMobileMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.mobileMenuOpen.update(val => !val);
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
