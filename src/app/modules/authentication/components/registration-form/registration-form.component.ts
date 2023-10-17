import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models';
import { AuthenticationService } from '../../services';

// validate that passwords are the same
const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let password = control.get('password');
  let confirmPassword = control.get('confirmPassword');

  // if any of the fields are empty, disable validation.
  if (!password?.value || !confirmPassword?.value) {
    return null;
  }

  // if both fields have values, check if they match
  if (password.value !== confirmPassword.value) {
    return { passwordsNotMatching: true };
  }

  // if the fields match, the validation is successful
  return null;
};

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgClass, NgIf],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent {
  status: string = 'init';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  },
  { validators: confirmPasswordValidator }
  );

  constructor(
    private _router: Router,
    private _authenticationServices: AuthenticationService
  ) { }

  submit() {
    if (this.registrationForm.valid) {
      this.status = 'loading';
      const user: User = this.registrationForm.getRawValue();

      console.log(user);
      //to do register...
      /*
      this._authenticationServices.login(user).subscribe({
        next: () => { this._router.navigate(['/home']) },
        error: () => { this.status = 'failed'; }
      });
      */
      //clear the form after submitting the data
      this.registrationForm.reset();
      this.registrationForm.markAsPristine();
      this.registrationForm.markAsUntouched();
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.setErrors(null);
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
