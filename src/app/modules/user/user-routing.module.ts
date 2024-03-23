import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '.';
import { EditComponent, PasswordComponent } from './pages';

const routes: Routes = [
  { path: '', title: 'Dashboard', component: UserComponent },
  { path: 'edit', title: 'Editar perfil', component: EditComponent },
  { path: 'change-password', title: 'Cambiar contraseña', component: PasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
