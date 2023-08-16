import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages';
import { LoginFormComponent } from './components';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    LoginComponent,
],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LoginFormComponent,
    MatCardModule
  ]
})
export class AuthenticationModule { }
