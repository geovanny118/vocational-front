import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;

  search(userId: string):Observable<User | any> {
    return this._httpClient.get(`${this._baseUrl}/auth/obtain/${userId}`);
  }

  update(userId: string, user: User): Observable<any>{
    return this._httpClient.put(`${this._baseUrl}/auth/update/${userId}`, user)
  }

  delete(userId: string): void{}

  save(user: User): Observable<User | any> {
    return this._httpClient.post(`${this._baseUrl}/auth/nuevo`, user);
  }
}
