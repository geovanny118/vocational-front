import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, RegistrationComponent } from './pages';
import { LoginFormComponent, RegistrationFormComponent } from './components';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LoginFormComponent,
    RegistrationFormComponent,
    MatCardModule,
    MatStepperModule
  ]
})
export class AuthenticationModule { }
