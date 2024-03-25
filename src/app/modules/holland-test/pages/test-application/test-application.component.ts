import { Component, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { HollandTestService } from '../../services';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/modules/authentication/models';
import { HollandQuestion } from '../../models';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgClass, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-test-application',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    NgxPaginationModule,
    NgClass,
    MatSnackBarModule,
    NgIf,
    MatCheckboxModule
  ],
  templateUrl: './test-application.component.html',
  styleUrl: './test-application.component.scss'
})
export class TestApplicationComponent {
  private _hollandTestServices: HollandTestService = inject(HollandTestService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  authenticationServices = inject(AuthenticationService);
  user: Usuario | undefined;
  hollandTestForm: FormGroup = new FormGroup({});
  answers: number[] = [];
  questions: HollandQuestion[] = [];
  currentPage: number = 1;
  progressBarValue: number = 0;
  changePage: boolean = false;

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
    this._hollandTestServices.getQuestions().subscribe(
      (response: HollandQuestion[]) => {
        this.questions = response;
        //this.hollandTestForm = this.initializeForm();
      }
    );
  }

  sendAnswer(): void {

  }

  onPageChange(event: number): void {
    this.changePage = true;
    if (this.isPageComplete(event)) {
      this.currentPage = event;
      this.changePage = false;
    }
  }

  isPageComplete(page: number): boolean {

    return true; // Retorna verdadero si todas las respuestas están seleccionadas
  }
}
