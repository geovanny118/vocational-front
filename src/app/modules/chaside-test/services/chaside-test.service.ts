import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { ChasideResult, ChasidePregunta, University, CardsUniversidades } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChasideTestService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  // undefined: estado inicial | null: sin asignar | ChasideResult resultados
  currentChasideResultSignal = signal<ChasideResult[] | undefined | null>(undefined);

  // undefined: estado inicial | null: sin asignar | CardsUniversidades resultados
  currentUniversitiesResultSignal = signal<CardsUniversidades[] | undefined | null>(undefined);

  // undefined: estado inicial | null: sin asignar | string
  currentCareerSignal = signal<string | undefined | null>(undefined);

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

  getUniversities(specialty: string): Observable<University | any> {
    const identificacion = localStorage.getItem('identificacion') ?? '';
    const requestBody = {
      identificacion: identificacion,
      test: 'chaside',
      especialidad: specialty
    };
    return this._httpClient.post(`${this._baseUrl}/university/especiality`, requestBody);
  }
}