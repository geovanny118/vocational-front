import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../models';
import { AuthenticationService } from '../../services';

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

  
  registrationForm: FormGroup = this._formBuilder.group({
    identificacion: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, 
  {
    validators: confirmPasswordValidator
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authenticationServices: AuthenticationService
  ) { }

  submit() {
    if (this.registrationForm.valid) {
      this.status = 'loading';
      const user: Usuario = this.registrationForm.getRawValue();

      console.log(user);
      // llama al servicio para el registro, si es correcto redirige a la pantalla de login
      this._authenticationServices.registration(user).subscribe({
        next: () => { this._router.navigate(['/authentication/login']) },
        error: () => { this.status = 'failed'; }
      });
      
      // limpia el formulario despues de enviar la informacion
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
