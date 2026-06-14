import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationState {
  readonly purchased?: unknown;
}

@Component({
  selector: 'app-checkout',
  template: `
    <section class="order" aria-live="polite">
      @if (purchaseState()) {
        <h1>Order has been placed successfully</h1>
        <h3>Payment: <span class="cod"> Cash on delivery </span></h3>
      } @else {
        <h3 class="not-ordered">Please purchase some burgers!</h3>
      }
    </section>
  `,
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly router = inject(Router);
  private readonly navigationState = this.router.getCurrentNavigation()?.extras.state as
    | NavigationState
    | undefined;

  protected readonly purchaseState = signal(this.navigationState?.purchased === true);
}
