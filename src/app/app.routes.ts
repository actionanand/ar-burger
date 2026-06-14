import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/burger-builder/burger-builder.component').then(
        (m) => m.BurgerBuilderComponent,
      ),
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
