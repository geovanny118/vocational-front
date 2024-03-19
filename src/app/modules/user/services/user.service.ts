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

  getUserInfo(userId: string):Observable<User | any> {
    return this._httpClient.get(`${this._baseUrl}/auth/obtain/${userId}`);
  }

  updateUserInfo(userId: string, user: User): Observable<any>{
    return this._httpClient.put(`${this._baseUrl}/auth/update/${userId}`, user)
  }
}
