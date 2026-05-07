import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent],
  template: `
    @if (showShell()) {
      <app-layout>
        <router-outlet></router-outlet>
      </app-layout>
    } @else {
      <router-outlet></router-outlet>
    }
  `,
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  private readonly currentUrl = signal(this.router.url);

  readonly showShell = computed(() => {
    const url = this.currentUrl();
    return !url.startsWith('/login') && !url.startsWith('/signup');
  });

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }
}
