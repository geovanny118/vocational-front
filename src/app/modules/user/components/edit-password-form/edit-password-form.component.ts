import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { PasswordChangeRequest } from '../../models';
import { UserService } from '../../services';

// valida que las contraseñas sean iguales
const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let newPassword = control.get('newPassword');
  let confirmPassword = control.get('confirmPassword');

  // si cualquier campo esta vacio deshabilita la validacion
  if (!newPassword?.value || !confirmPassword?.value) {
    return null;
  }

  // si ambos campos tiene valores, verifica si las contraseñas son iguales
  if (newPassword.value !== confirmPassword.value) {
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
  _userServices: UserService = inject(UserService);
  _router: Router = inject(Router);
  authenticationServices = inject(AuthenticationService);

  passwordForm: FormGroup = this._formBuilder.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
    {
      validators: confirmPasswordValidator
    });

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      this.authenticationServices.getLoggedInUserInfo(userId).subscribe({
        next: (response) => {
          this.authenticationServices.currentUserSignal.set(response);
        },
        error: () => {
          this.authenticationServices.currentUserSignal.set(null);
        }
      });
    }
  }

  updatePassword():void {
    if (this.passwordForm.valid) {
      const userId = localStorage.getItem('identificacion') ?? '';
      const formValues = this.passwordForm.getRawValue();
      const passwordRequest: PasswordChangeRequest = {
        password: formValues.currentPassword,
        passwordNew: formValues.newPassword
      };

      console.log(passwordRequest);

      this._userServices.changePassword(userId, passwordRequest).subscribe({
        next: () => { this._router.navigate(['/user']) },
        error: () => { this.status = 'failed'; }
      });

      // limpia el formulario despues de enviar la informacion
      this.passwordForm.reset();
      this.passwordForm.markAsPristine();
      this.passwordForm.markAsUntouched();
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.setErrors(null);
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

}
