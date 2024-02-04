import { UsuarioAutenticado } from './../../models/auth.model';
import { Component, inject } from '@angular/core';
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

  status: string = 'init';
  hide: boolean = true;

  loginForm: FormGroup = this._formBuilder.nonNullable.group({
    identificacion: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.loginForm.valid) {
      this.status = 'loading';
      const credentials: LoginCredentials = this.loginForm.getRawValue();

      //console.log(credentials);
      //to do login...
      this._authenticationServices.login(credentials).subscribe( (response) => {
        localStorage.setItem('token', response.token);
        this._authenticationServices.currentUserSig.set(response);
        this._router.navigateByUrl('/user');
      });

      //clear the form after submitting the data
      this.loginForm.reset();
      this.loginForm.markAsPristine();
      this.loginForm.markAsUntouched();
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.setErrors(null);
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
