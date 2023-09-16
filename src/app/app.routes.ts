import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules').then(modules => modules.HomeModule) },
  { path: 'authentication', loadChildren: () => import('./modules').then(modules => modules.AuthenticationModule) },
  { path: 'user', loadChildren: () => import('./modules').then(modules => modules.UserModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
