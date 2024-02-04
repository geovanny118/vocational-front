import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { LoginCredentials, Usuario, UsuarioAutenticado } from '../models';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.API_URL;
  // undefined: estado iniciar | null: no autorizado | UsuarioAutenticado: logueado
  currentUserSig = signal<UsuarioAutenticado | undefined | null>(undefined);  
  
  login(credentials: LoginCredentials): Observable<any> {
    /* const { identificacion, password } = credentials;
    console.log({ identificacion, password });
    return this._httpClient.post(`${this.baseUrl}/auth/login`, { identificacion, password }); */
    const { identificacion, password } = credentials;
    console.log({ identificacion, password });
    return this._httpClient.post(`${this._baseUrl}/auth/login`, credentials);
  }

  registration(usuario: Usuario): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/auth/nuevo`, usuario);
  }

  logout(){}

  forgotPassword(){}
}
