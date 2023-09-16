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

  login(credentials: LoginCredentials){
    const { email, password } = credentials;
    console.log({email, password});
    return this._httpClient.post(`${this.baseUrl}/api/v1/auth/login`, { email, password });
  }

  registration(){}
}
