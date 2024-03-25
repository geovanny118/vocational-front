import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { HollandResult, HollandQuestion } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HollandTestService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  // undefined: estado inicial | null: sin asignar | HollandResult: resultados
  currentHollandResultSignal = signal<HollandResult[] | undefined | null>(undefined);

  submitAnswers(answer: number[]): Observable<HollandResult | any> {
    const requestBody = { testQuestion: answer };
    return this._httpClient.post(`${this._baseUrl}/test-holland/result`, requestBody);
  }

  getQuestions(): Observable<HollandQuestion[] | any> {
    return this._httpClient.get(`${this._baseUrl}/pregunta/lista-holland/holland`);
  }
}
