import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { ChasideResult } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChasideTestService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;
  
  // undefined: estado inicial | null: sin asignar | ChasideResult resultados
  currentChasideResultSignal = signal<ChasideResult[] | undefined | null>(undefined);

  submitAnswers(answer: number[]): Observable<ChasideResult | any> {
    const requestBody = { testQuestion: answer };
    return this._httpClient.post(`${this._baseUrl}/test-chaside/result`, requestBody);
  }
}
