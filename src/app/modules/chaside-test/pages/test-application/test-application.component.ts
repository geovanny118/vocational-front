import { ChasideTestService } from './../../services';
import { Component, inject } from '@angular/core';
import { QuestionComponent } from '../../components';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-test-application',
  standalone: true,
  imports: [QuestionComponent, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './test-application.component.html',
  styleUrl: './test-application.component.scss'
})
export class TestApplicationComponent {
  private _chasideTestServices: ChasideTestService = inject(ChasideTestService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  answers: string[] = [];

  questions: string[] = [
    '¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?',
    '¿Te ofrecerías para organizar la despedida de soltero o soltera de uno de tus amigos o amigas?',
    '¿Te gustaría dirigir un proyecto de urbanización en tu provincia?',
    '¿A una frustración siempre opones un pensamiento positivo?',
    '¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?'
  ];

  chasideTestForm: FormGroup = this._formBuilder.nonNullable.group({

  });

  sendAnswer(): void {
    
  }
}
