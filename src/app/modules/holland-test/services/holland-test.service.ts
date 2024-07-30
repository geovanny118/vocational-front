import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { HollandResult, HollandQuestion } from '../models';
import { Observable } from 'rxjs';
import { CardsUniversidades, University } from '../../holland-test/models';

@Injectable({
  providedIn: 'root'
})
export class HollandTestService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  // undefined: estado inicial | null: sin asignar | HollandResult: resultados
  currentHollandResultSignal = signal<HollandResult[] | undefined | null>(undefined);

  // undefined: estado inicial | null: sin asignar | CardsUniversidades resultados
  currentUniversitiesResultSignal = signal<CardsUniversidades[] | undefined | null>(undefined);

  // undefined: estado inicial | null: sin asignar | string
  currentCareerSignal = signal<string | undefined | null>(undefined);

  submitAnswers(answer: number[]): Observable<HollandResult | any> {
    const identificacion = localStorage.getItem('identificacion') ?? '';
    const requestBody = {
      identificacion: identificacion,
      testQuestion: answer
    };
    return this._httpClient.post(`${this._baseUrl}/test-Holland/result`, requestBody);
  }

  getQuestions(): Observable<HollandQuestion[] | any> {
    return this._httpClient.get(`${this._baseUrl}/pregunta/lista-holland/holland`);
  }

  getUniversities(specialty: string): Observable<University | any> {
    const identificacion = localStorage.getItem('identificacion') ?? '';
    const requestBody = {
      identificacion: identificacion,
      test: 'holland',
      especialidad: specialty
    };
    return this._httpClient.post(`${this._baseUrl}/university/especiality`, requestBody);
  }
}
