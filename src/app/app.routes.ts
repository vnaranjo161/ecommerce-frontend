import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register.component')
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component')
  }
];
