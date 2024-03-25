import { Component, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { HollandTestService } from '../../services';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  changePage: boolean = true;
  currentPage: number = 1;
  isCheckboxSelected: boolean = false;

  // Objeto para mantener un registro del estado de cada grupo de radio-buttons
  checkboxGroupState: { [key: string]: boolean } = {};

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
        this.hollandTestForm = this.initializeForm();
      }
    );
  }

  initializeForm(): FormGroup {
    const formControls: { [key: string]: FormControl } = {};
    this.questions.forEach((question, index) => {
      //formControls[`answer_${index + 1}`] = new FormControl(''); //--- deshabilita validación, solo para pruebas
      formControls[`answer_${index + 1}`] = new FormControl('');
    });
    return this._formBuilder.group(formControls);
  }

  onCheckBoxChange(event: any, groupName: string) {
    this.checkboxGroupState[groupName] = !this.checkboxGroupState[groupName];
    this.answers = this.calculateSumByGroups();
  }

  sendAnswer(): void {
    console.log(this.answers);
  }

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkboxGroupState).some(value => value === true);
  }

  onPageChange(event: number): void {
    this.currentPage = event;
  }

  calculateSumByGroups(): number[] {
    const results: number[] = [];
    let sumGroup = 0;

    for (let i = 0; i < 54; i++) { 
      if (this.checkboxGroupState['answer_' + (i + 1)] === true) { 
        sumGroup++;
      }

      // Si el índice es divisible por 9 o es el último checkbox, se agrega la suma al arreglo resultados
      if ((i + 1) % 9 === 0 || i === 53) {
        results.push(sumGroup);
        sumGroup = 0;
      }
    }
    return results;
  }
}
