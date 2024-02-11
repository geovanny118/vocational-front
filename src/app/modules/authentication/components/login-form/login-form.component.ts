import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginCredentials } from '../../models';
import { AuthenticationService } from '../../services';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgClass, NgIf, MatSnackBarModule],
})
export class LoginFormComponent {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _authenticationServices: AuthenticationService = inject(AuthenticationService);
  private _snackBar: MatSnackBar = inject(MatSnackBar); 

  // variable utilizada para la accion de mostrar y ocultar contraseñas
  hide: boolean = true;

  loginForm: FormGroup = this._formBuilder.nonNullable.group({
    identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    this._authenticationServices.loginLoadingSignal.set(true);
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.getRawValue();
      
      // servicio para el login
      this._authenticationServices.login(credentials).pipe(
        catchError(HttpErrorResponse => {
          if (HttpErrorResponse.status === 404) {
            // Manejar el error 404 aquí
            //console.error('Error de autenticación:', HttpErrorResponse?.error?.mensajes);
            //this._snackBar.open('credenciales incorrectas', '', {
            this._snackBar.open(HttpErrorResponse?.error?.mensajes, '', {
              duration: 2000
            });
          }
          return HttpErrorResponse; // Propagar el error para que lo maneje el código que llama a esta función
        })
      ).subscribe((response) => {
        //console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('identificacion', response.identificacion);
        //this._authenticationServices.currentUserSig.set(response);
        this._router.navigateByUrl('/user');
      });

      // limpia el formulario
      this.loginForm.reset();
      this.loginForm.markAsPristine();
      this.loginForm.markAsUntouched();
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.setErrors(null);
        this.loginForm.get(key)?.updateValueAndValidity();
      });
      this._authenticationServices.loginLoadingSignal.set(false);
      console.log(this.loginForm.valid);
    } else {
      this.loginForm.markAllAsTouched();
      this._authenticationServices.loginLoadingSignal.set(false);
    }
  }
}
