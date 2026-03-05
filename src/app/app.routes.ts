import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthenticatedGuard } from './core/guards/no-authenticated.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    canActivate: [noAuthenticatedGuard],
    loadComponent: () => import('./features/auth/pages/register/register.component')
  },
  {
    path: 'login',
    canActivate: [noAuthenticatedGuard],
    loadComponent: () => import('./features/auth/pages/login/login.component')
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./features/products/pages/products/products.component')
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cart/pages/cart/cart.component')
  }
];
