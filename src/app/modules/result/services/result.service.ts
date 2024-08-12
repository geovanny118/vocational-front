import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Results } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  // undefined: estado inicial | null: sin asignar | string
  currentChasideSignal = signal<string | undefined | null>(undefined);

  // undefined: estado inicial | null: sin asignar | string
  currentHollandSignal = signal<string | undefined | null>(undefined);

  getResultschaside(): Observable<Results[] | any> {
    const identificacion = localStorage.getItem('identificacion') ?? '';

    const requestBody = {
      identificacion: identificacion,
      test: 'chaside'
    };
    //console.log(requestBody);
    return this._httpClient.post(`${this._baseUrl}/auth/obtain-test/`, requestBody);
  }

  getResultsHolland(): Observable<Results[] | any> {
    const identificacion = localStorage.getItem('identificacion') ?? '';

    const requestBody = {
      identificacion: identificacion,
      test: 'holland'
    };
    //console.log(requestBody);
    return this._httpClient.post(`${this._baseUrl}/auth/obtain-test/`, requestBody);
  }
}
