import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, RegistrationComponent, PasswordRecoveryComponent, NotFoundComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Inscripción',
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    title: 'Recuperación de contraseña',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
