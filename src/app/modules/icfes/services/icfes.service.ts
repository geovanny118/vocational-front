import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IcfesResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IcfesService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  uploadPdf(formData: FormData): Observable<IcfesResult | any>{
    return this._httpClient.post(`${this._baseUrl}/icfes/upload-pdf`, formData);
  }

}
