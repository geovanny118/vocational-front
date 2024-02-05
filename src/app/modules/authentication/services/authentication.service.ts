import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { LoginCredentials, Usuario, UsuarioAutenticado } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.API_URL;
  private _router: Router = inject(Router);
  // undefined: estado iniciar | null: no autorizado | UsuarioAutenticado: logueado
  currentUserSig = signal<UsuarioAutenticado | undefined | null>(undefined);  
  
  login(credentials: LoginCredentials): Observable<UsuarioAutenticado | any> {
    return this._httpClient.post(`${this._baseUrl}/auth/login`, credentials);
  }

  registration(user: Usuario): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/auth/nuevo`, user);
  }

  logout(): void {
    // Limpiar el token almacenado en el localStorage y redireciona a la pagina de login
    localStorage.removeItem('token');
    this._router.navigateByUrl('/authentication/login');
  }

  isLoggedIn(): boolean {
    // Verifica si el usuario está autenticado
    return !!localStorage.getItem('token');
  }

  forgotPassword(){}
}
