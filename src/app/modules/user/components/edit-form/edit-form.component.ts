import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models';
import { UserService } from '../../services';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgClass, NgIf],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent {
  status: string = 'init';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  
  user: User | undefined;
  authenticationServices: AuthenticationService = inject(AuthenticationService);
  _userServices: UserService = inject(UserService); 

  editForm: FormGroup = this._formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      forkJoin([
        this.authenticationServices.getLoggedInUserInfo(userId),
        this._userServices.search(userId)
      ])
        .subscribe({
          next: ([authenticationResponse, userResponse]) => {
            this.authenticationServices.currentUserSignal.set(authenticationResponse);

            // Asignar los valores del usuario al formulario
            this.editForm.patchValue({
              nombres: userResponse?.nombres,
              apellidos: userResponse?.apellidos,
              telefono: userResponse?.telefono,
              direccion: userResponse?.direccion,
              ciudad: userResponse?.ciudad,
              email: userResponse?.email
            });
          },
          error: (error) => {
            console.error('Error fetching user information:', error);
          }
        });
    }
  }

  edit() {
    if (this.editForm.valid) {
      this.status = 'loading';
      const userId = localStorage.getItem('identificacion') ?? ''; 
      const user: User = this.editForm.getRawValue();

      console.log(userId);
      console.log(user);

      this._userServices.update(userId, user).subscribe({
        next: () => { this._router.navigate(['/user']) },
        error: () => { this.status = 'failed'; }
      });

      // limpia el formulario despues de enviar la informacion
      this.editForm.reset();
      this.editForm.markAsPristine();
      this.editForm.markAsUntouched();
      Object.keys(this.editForm.controls).forEach(key => {
        this.editForm.get(key)?.setErrors(null);
      });
      
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}
