import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginCredentials } from '../../models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgClass, NgIf],

})
export class LoginFormComponent {

  status: string = 'init';
  hide: boolean = true;

  loginForm: FormGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  submit() {
    if (this.loginForm.valid) {
      this.status = 'loading';
      const { email, password } = this.loginForm.getRawValue();
      const credentials: LoginCredentials = { email, password };

      console.log(credentials);
      //to do login...

      //limpia el formulario
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
