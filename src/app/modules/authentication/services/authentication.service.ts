import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { LoginCredentials } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = environment.API_URL;

  constructor(private _httpClient: HttpClient) { }

  login(credentials: LoginCredentials): any{
    const { identificacion, password } = credentials;
    console.log({ identificacion, password});
    return this._httpClient.post(`${this.baseUrl}/api/v1/auth/login`, { identificacion, password });
  }

  registration(){}

  logout(){}

  forgotPassword(){}
}
