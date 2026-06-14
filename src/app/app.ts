import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isSideDrawerOpen = signal(false);

  protected toggleSideDrawer(): void {
    this.isSideDrawerOpen.update((isOpen) => !isOpen);
  }

  protected closeSideDrawer(): void {
    this.isSideDrawerOpen.set(false);
  }
}
