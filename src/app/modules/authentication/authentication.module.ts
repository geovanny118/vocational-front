import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, PasswordRecoveryComponent, RegistrationComponent } from './pages';
import { LoginFormComponent, PasswordRecoveryFormComponent, RegistrationFormComponent } from './components';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    PasswordRecoveryComponent
],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LoginFormComponent,
    RegistrationFormComponent,
    PasswordRecoveryFormComponent,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class AuthenticationModule { }
