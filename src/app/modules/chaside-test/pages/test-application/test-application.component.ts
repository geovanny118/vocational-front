import { ChasideTestService } from './../../services';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChasidePregunta, ChasideResult } from '../../models';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { Usuario } from 'src/app/modules/authentication/models';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-test-application',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    NgxPaginationModule,
    MatProgressBarModule,
    NgClass,
    MatSnackBarModule,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './test-application.component.html',
  styleUrl: './test-application.component.scss'
})
export class TestApplicationComponent {
  private _chasideTestServices: ChasideTestService = inject(ChasideTestService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  authenticationServices = inject(AuthenticationService);
  user: Usuario | undefined;
  chasideTestForm: FormGroup = new FormGroup({});
  answers: number[] = [];
  questions: ChasidePregunta[] = [];
  currentPage: number = 1;
  progressBarValue: number = 0;
  changePage: boolean = false;
  loading: boolean = false;

  // Objeto para mantener un registro del estado de cada grupo de radio-buttons
  radioGroupState: { [key: string]: boolean } = {};

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
    this._chasideTestServices.getQuestions().subscribe(
      (response: ChasidePregunta[]) => {
        this.questions = response;
        this.chasideTestForm = this.initializeForm();
      }
    );
  }

  initializeForm(): FormGroup {
    const formControls: { [key: string]: FormControl } = {};
    this.questions.forEach((question, index) => {
      formControls[`answer_${index + 1}`] = new FormControl(''); //--- deshabilita validación, solo para pruebas
      //formControls[`answer_${index + 1}`] = new FormControl('', Validators.required);
    });
    return this._formBuilder.group(formControls);
  }

  sendAnswer(): void {
    //this.answers = [];
    //this.answers = [1, 2, 3, 7, 11, 14, 15, 18, 21, 22, 26, 28, 31, 32, 33, 37, 41, 42, 44, 47, 48, 49, 51, 52, 53, 57, 58, 59, 63, 64, 66, 67, 68, 71, 72, 73, 76, 77, 79, 81, 82, 86, 87, 89, 90, 91, 92, 95, 96, 97]; //--- descomentar solo para pruebas
    this.answers = [6, 38, 47, 70, 16, 44, 62, 92];//--- descomentar solo para pruebas

    for (let i = 0; i < this.questions.length; i++) {
      const answerControl = this.chasideTestForm.get(`answer_${i}`);
      if (answerControl instanceof FormControl && answerControl.value === 'si') {
        this.answers.push(i);
      }
    }

    console.log('Respuestas enviadas:', this.answers);
    this.loading = true;
    this._chasideTestServices.submitAnswers(this.answers).subscribe(
      (results: ChasideResult[]) => {
        console.log('Respuestas del test:', results);
        this._chasideTestServices.currentChasideResultSignal.set(results);
        this._router.navigateByUrl('/chaside/result').then(() => {
          this.loading = false;
        });
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
      }
    );
  }

  // Función que se ejecuta cuando cambia el estado del radio button
  onRadioButtonChange(event: any, groupName: string) {
    if (this.progressBarValue > 100) {
      this.progressBarValue = 100;
    }
    if (!this.radioGroupState[groupName]) {
      this.progressBarValue += (100 / 98);
      // Marcar este grupo como seleccionado para evitar incrementar más de una vez
      this.radioGroupState[groupName] = true;
    }
  }

  onPageChange(event: number): void {
    this.changePage = true;
    if (this.isPageComplete(event)) {
      this.currentPage = event;
      this.changePage = false;
    }
  }

  isPageComplete(page: number): boolean {
    let currentPage = page - 1;
    let startIndex;
    let endIndex;
    let unansweredQuestions: number[] = [];

    // Si se dirige a la pagina 1, evita que startIndex tome numeros negativos
    if (currentPage === 0 && page === 1) {
      startIndex = 0;
      endIndex = 10;
    }
    else {
      startIndex = (currentPage - 1) * 10;
      endIndex = Math.min(startIndex + 10, this.questions.length);
    }

    for (let i = startIndex; i < endIndex; i++) {
      const control = this.chasideTestForm.get(`answer_${i + 1}`);
      if (!control || !control.value) {
        unansweredQuestions.push(i + 1);
      }
    }

    if (unansweredQuestions.length > 0) {
      this.showMessageUnansweredQuestions(unansweredQuestions);
      return false;
    }

    return true; // Retorna verdadero si todas las respuestas están seleccionadas
  }

  showMessageUnansweredQuestions(unansweredQuestions: number[]): void {
    let mensaje = 'Pregunta(s) sin responder: ';
    unansweredQuestions.forEach((indice, index) => {
      mensaje += `[${indice}] `; // Agrega cada pregunta sin responder al mensaje
    });
    this._snackBar.open(mensaje, '', { duration: 2000 });
  }

}
