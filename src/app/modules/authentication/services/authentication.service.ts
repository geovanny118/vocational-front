import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { LoginCredentials, Usuario } from '../models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = environment.API_URL;

  constructor(private _httpClient: HttpClient) { }

  login(credentials: LoginCredentials): Observable<any> {
    /* const { identificacion, password } = credentials;
    console.log({ identificacion, password });
    return this._httpClient.post(`${this.baseUrl}/auth/login`, { identificacion, password }); */
    const { identificacion, password } = credentials;
    console.log({ identificacion, password });
    return this._httpClient.post(`${this.baseUrl}/auth/login`, credentials);
  }

  registration(usuario: Usuario): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/auth/nuevo`, usuario);
  }

  logout(){}

  forgotPassword(){}
}
