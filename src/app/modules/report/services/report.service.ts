import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  downloadFile(reportType: string): Observable<Blob> {
    return this._httpClient.get(`${this._baseUrl}/reportes/informes/${reportType.toLowerCase()}`, { responseType: 'blob' });
  }

}
