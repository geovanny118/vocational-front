import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { ChasideResult, ChasidePregunta } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChasideTestService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  // undefined: estado inicial | null: sin asignar | ChasideResult resultados
  currentChasideResultSignal = signal<ChasideResult | undefined | null>(undefined);

  submitAnswers(answer: number[]): Observable<ChasideResult | any> {
    const identificacion = localStorage.getItem('identificacion') ?? '';
    const requestBody = {
      identificacion: identificacion,
      testQuestion: answer
    };
    return this._httpClient.post(`${this._baseUrl}/test-chaside/result`, requestBody);
  }

  getQuestions(): Observable<ChasidePregunta[] | any> {
    return this._httpClient.get(`${this._baseUrl}/pregunta/lista-chaside/Chaside`);
  }
}
