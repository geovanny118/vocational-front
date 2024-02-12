import { Routes } from '@angular/router';
import { AuthGuard } from './modules/authentication/guards';
import { NotFoundComponent } from './modules/authentication/pages';

export const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules').then(modules => modules.HomeModule) },
  { path: 'authentication', loadChildren: () => import('./modules').then(modules => modules.AuthenticationModule) },
  { path: 'user', loadChildren: () => import('./modules').then(modules => modules.UserModule), canMatch: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: 'Not found', component: NotFoundComponent },
];
