import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginCredentials } from '../../models';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgClass, NgIf],
})
export class LoginFormComponent {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _authenticationServices: AuthenticationService = inject(AuthenticationService);

  // variable utilizada para la accion de mostrar y ocultar contraseñas
  hide: boolean = true;
  @Output() submitEvent = new EventEmitter<boolean>();

  loginForm: FormGroup = this._formBuilder.nonNullable.group({
    identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.loginForm.valid) {
      this.submitEvent.emit(true);
      const credentials: LoginCredentials = this.loginForm.getRawValue();

      //console.log(credentials);
      // servicio para el login
      this._authenticationServices.login(credentials).subscribe( (response) => {
        localStorage.setItem('token', response.token);
        this._authenticationServices.currentUserSig.set(response);
        this._router.navigateByUrl('/user');
      });

      // limpia el formulario
      this.loginForm.reset();
      this.loginForm.markAsPristine();
      this.loginForm.markAsUntouched();
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.setErrors(null);
      });
      this.submitEvent.emit(false);
    } else {
      this.loginForm.markAllAsTouched();
      this.submitEvent.emit(false);
    }
  }
}
