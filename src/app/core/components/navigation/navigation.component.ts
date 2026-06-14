import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { BackdropComponent } from '../../../shared/components/backdrop/backdrop.component';

@Component({
  selector: 'app-navigation',
  imports: [BackdropComponent, LogoComponent, RouterLink, RouterLinkActive],
  template: `
    <header class="toolbar">
      <button
        type="button"
        class="drawer-toggle"
        aria-label="Open navigation menu"
        aria-controls="mobile-navigation"
        [attr.aria-expanded]="drawerOpen()"
        (click)="drawerToggle.emit()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <a class="logo-link" routerLink="/" aria-label="Go to Burger Builder">
        <app-logo />
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <ul class="navigation-items">
          <li class="navigation-item">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
              Burger Builder
            </a>
          </li>
          <li class="navigation-item">
            <a routerLink="/orders" routerLinkActive="active">Orders</a>
          </li>
        </ul>
      </nav>
    </header>

    <app-backdrop
      [show]="drawerOpen()"
      label="Close navigation menu"
      (clicked)="drawerClose.emit()"
    />

    <aside
      id="mobile-navigation"
      class="side-drawer"
      [class.open]="drawerOpen()"
      [attr.inert]="drawerOpen() ? null : ''"
      aria-label="Mobile navigation"
    >
      <a
        class="drawer-logo"
        routerLink="/"
        aria-label="Go to Burger Builder"
        (click)="drawerClose.emit()"
      >
        <app-logo />
      </a>

      <nav aria-label="Mobile primary navigation">
        <ul class="navigation-items">
          <li class="navigation-item">
            <a
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="drawerClose.emit()"
            >
              Burger Builder
            </a>
          </li>
          <li class="navigation-item">
            <a routerLink="/orders" routerLinkActive="active" (click)="drawerClose.emit()"
              >Orders</a
            >
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly drawerOpen = input(false);
  readonly drawerToggle = output<void>();
  readonly drawerClose = output<void>();
}
