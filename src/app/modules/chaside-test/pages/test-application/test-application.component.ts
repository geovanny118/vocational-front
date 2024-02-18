import { Component } from '@angular/core';
import { QuestionComponent } from '../../components';

@Component({
  selector: 'app-test-application',
  standalone: true,
  imports: [QuestionComponent],
  templateUrl: './test-application.component.html',
  styleUrl: './test-application.component.scss'
})
export class TestApplicationComponent {
  questions: string[] = [
    '¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?',
    '¿Te ofrecerías para organizar la despedida de soltero o soltera de uno de tus amigos o amigas?',
    '¿Te gustaría dirigir un proyecto de urbanización en tu provincia?',
    '¿A una frustración siempre opones un pensamiento positivo?',
    '¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?'
  ];

  sendAnswer(): void {
    
  }
}
