import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component'),
  },
];
