import { ChasideTestService } from './../../services';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { ChasideResult, QUESTIONS } from '../../models';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { Usuario } from 'src/app/modules/authentication/models';

@Component({
  selector: 'app-test-application',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatRadioModule],
  templateUrl: './test-application.component.html',
  styleUrl: './test-application.component.scss'
})
export class TestApplicationComponent {
  private _chasideTestServices: ChasideTestService = inject(ChasideTestService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  authenticationServices = inject(AuthenticationService);
  
  user: Usuario | undefined;
  chasideTestForm: FormGroup;
  answers: number[] = [];

  questions: string[] = QUESTIONS;

  constructor(){
    this.chasideTestForm = this.initializeForm();
  }

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

  initializeForm(): FormGroup {
    const formControls: { [key: string]: FormControl } = {};
    this.questions.forEach((question, index) => {
      formControls[`answer_${index}`] = new FormControl('');
    });
    return this._formBuilder.group(formControls);
  }

  sendAnswer(): void {   
    this.answers = [];

    for (let i = 0; i < this.questions.length; i++) {
      // Verificar si la pregunta fue respondida con "sí"
      const answerControl = this.chasideTestForm.get(`answer_${i}`); 
      if (answerControl && answerControl.value === 'si') {
        this.answers.push(i+1);
      }
    }

    console.log('Respuestas enviadas:', this.answers);
    this._chasideTestServices.submitAnswers(this.answers).subscribe(
      (results: ChasideResult[]) => {
        console.log('Respuestas del test:', results);
        // Asignar los resultados a una señal en chaside-test-service
        this._chasideTestServices.currentChasideResultSignal.set(results);
        this._router.navigateByUrl('/chaside/result');
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
      }
    );
  }
}
