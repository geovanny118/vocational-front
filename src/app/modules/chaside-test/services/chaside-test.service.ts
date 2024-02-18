import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { ChasideResult } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChasideTestService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  submitAnswers(answer: number[]): Observable<ChasideResult | any> {
    return this._httpClient.post(`${this._baseUrl}/test-chaside/result`, answer);
  }
}
