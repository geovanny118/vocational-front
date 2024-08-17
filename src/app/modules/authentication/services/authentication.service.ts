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
  private _baseUrl: string = environment.apiBaseUrl;
  private _router: Router = inject(Router);

  // undefined: estado inicial | null: no autorizado | Usuario: logueado
  currentUserSignal = signal<Usuario | undefined | null>(undefined);
  // señal para mostrar el loading en la pagina de login
  loginLoadingSignal = signal<boolean>(false);

  login(credentials: LoginCredentials): Observable<UsuarioAutenticado | any> {
    return this._httpClient.post(`${this._baseUrl}/auth/login`, credentials);
  }

  register(user: Usuario): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/auth/nuevo`, user);
  }

  logout(): void {
    // Limpiar el token almacenado en el localStorage y redireciona a la pagina de login
    localStorage.removeItem('token');
    localStorage.removeItem('identificacion');
    localStorage.removeItem('expirationToken');
    this.currentUserSignal.set(null);
    this._router.navigateByUrl('/authentication/login');
  }

  isLoggedIn(): boolean {
    // Verifica si el usuario está autenticado
    return !!localStorage.getItem('token');
  }

  getLoggedInUserInfo(userId: string): Observable<Usuario> {
    return this._httpClient.get<Usuario>(`${this._baseUrl}/auth/obtain/${userId}`);
  }

  forgotPassword() { }

  isAdmin(): boolean {
    // Verifica si el usuario es administrador
    return localStorage.getItem('rol_usuario') === 'ROLE_ADMIN';
  }

  isTokenExpired(): boolean {
    const expirationToken = localStorage.getItem('expirationToken');
    if (!expirationToken) {
      return true;
    }

    const expirationDate = new Date(expirationToken).getTime();
    const now = new Date().getTime();

    return now >= expirationDate;
  }
}
