import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, RegistrationComponent, PasswordRecoveryComponent, NotFoundComponent } from './pages';
import { RedirectIfAuthenticatedGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [RedirectIfAuthenticatedGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Inscripción',
    canActivate: [RedirectIfAuthenticatedGuard]
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    title: 'Recuperación de contraseña',
    canActivate: [RedirectIfAuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
