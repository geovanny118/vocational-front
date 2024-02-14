import { Routes } from '@angular/router';
import { AuthGuard, RedirectIfAuthenticatedGuard } from './modules/authentication/guards';
import { NotFoundComponent } from './modules/authentication/pages';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules').then((modules) => modules.HomeModule),
    canActivate: [RedirectIfAuthenticatedGuard]
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./modules').then((modules) => modules.AuthenticationModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules').then((modules) => modules.UserModule),
    canMatch: [AuthGuard],
  },
  {
    path: 'chaside-test',
    loadChildren: () =>
      import('./modules').then((modules) => modules.ChasideTestModule),
    canMatch: [AuthGuard],
  },
  {
    path: 'icfes',
    loadChildren: () =>
      import('./modules').then((modules) => modules.IcfesModule),
    canMatch: [AuthGuard],
  },
  {
    path: 'result',
    loadChildren: () =>
      import('./modules').then((modules) => modules.ResultModule),
    canMatch: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: 'Not found', component: NotFoundComponent },
];
