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
import { ChasidePregunta, ChasideResult } from '../../models';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { Usuario } from 'src/app/modules/authentication/models';
import { NgClass } from '@angular/common';

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
    NgClass
  ],
  templateUrl: './test-application.component.html',
  styleUrl: './test-application.component.scss'
})
export class TestApplicationComponent {
  private _chasideTestServices: ChasideTestService = inject(ChasideTestService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router); 
  authenticationServices = inject(AuthenticationService);
  user: Usuario | undefined;
  chasideTestForm: FormGroup = new FormGroup({});
  answers: number[] = [];
  questions: ChasidePregunta[] = [];
  currentPage: number = 1;
  progressBarValue:number = 0;

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
      //formControls[`answer_${index + 1}`] = new FormControl(''); //--- deshabilita validación, solo para pruebas
      formControls[`answer_${index + 1}`] = new FormControl('', Validators.required);
    });
    return this._formBuilder.group(formControls);
  }

  sendAnswer(): void {   
    this.answers = [];

    for (let i = 0; i < this.questions.length; i++) {
      const answerControl = this.chasideTestForm.get(`answer_${i}`); 
      if (answerControl instanceof FormControl && answerControl.value === 'si') {
        this.answers.push(i);
      }
    }

    console.log('Respuestas enviadas:', this.answers);
    this._chasideTestServices.submitAnswers(this.answers).subscribe(
      (results: ChasideResult[]) => {
        console.log('Respuestas del test:', results);
        this._chasideTestServices.currentChasideResultSignal.set(results);
        this._router.navigateByUrl('/chaside/result');
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
      this.progressBarValue += (100/98);
      // Marcar este grupo como seleccionado para evitar incrementar más de una vez
      this.radioGroupState[groupName] = true;
    }
  }

  onPageChange(event: number): void {
    if (this.isPageComplete(event)) {
      this.currentPage = event;
    }
  }

  isPageComplete(page: number): boolean {
    let currentPage = page - 1;
    let startIndex;
    let endIndex;

    // Si se dirige a la pagina 1, evita start index tome numeros negativos
    if(currentPage === 0 && page === 1){
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
        console.log(false, 'pagina actual#: ', currentPage, 'index: ', i);
        return false; // Retorna falso si alguna respuesta está vacía o si el control no existe
      }
    }

    console.log(true, 'pagina actual#: ', currentPage);
    return true; // Retorna verdadero si todas las respuestas están seleccionadas
  }


}
