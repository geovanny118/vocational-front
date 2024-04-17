import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IcfesResult, Results } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IcfesService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  private resultsSource = new BehaviorSubject<Results[]>([]);
  currentResults = this.resultsSource.asObservable();

  uploadPdf(formData: FormData): Observable<IcfesResult | any> {
    return this._httpClient.post(`${this._baseUrl}/icfes/upload-pdf`, formData);
  }

  updateResults(results: Results[]): void {
    this.resultsSource.next(results);
  }
}
