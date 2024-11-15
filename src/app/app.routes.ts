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
    path: 'items',
    loadComponent: () => import('./pages/items/items.component'),
  },
];
