import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

// valida que las contraseñas sean iguales
const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let password = control.get('password');
  let confirmPassword = control.get('confirmPassword');

  // si cualquier campo esta vacio deshabilita la validacion
  if (!password?.value || !confirmPassword?.value) {
    return null;
  }

  // si ambos campos tiene valores, verifica si las contraseñas son iguales
  if (password.value !== confirmPassword.value) {
    return { passwordsNotMatching: true };
  }

  // si ambas contraseñas son iguales, pasa la validacion
  return null;
};

@Component({
  selector: 'app-edit-password-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgClass, NgIf],
  templateUrl: './edit-password-form.component.html',
  styleUrl: './edit-password-form.component.scss'
})
export class EditPasswordFormComponent {
  status: string = 'init';
  hideCurrentPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  _formBuilder: FormBuilder = inject(FormBuilder);

  passwordForm: FormGroup = this._formBuilder.group({
    currentPassword: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
    {
      validators: confirmPasswordValidator
    });

  updatePassword():void {

  }

}
