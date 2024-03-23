import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User, DeleteMessage, PasswordChangeRequest } from '../models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _baseUrl: string = environment.apiBaseUrl;
  private _router: Router = inject(Router);
  private _authenticationServices = inject(AuthenticationService);

  search(userId: string):Observable<User | any> {
    return this._httpClient.get(`${this._baseUrl}/auth/obtain/${userId}`);
  }

  update(userId: string, user: User): Observable<any>{
    return this._httpClient.put(`${this._baseUrl}/auth/update/${userId}`, user)
  }

  changePassword(userId: string, passwordRequest: PasswordChangeRequest): Observable<any> {
    return this._httpClient.put(`${this._baseUrl}/auth/update/${userId}`, passwordRequest)
  }

  delete(userId: string): void {
    this._httpClient.delete<DeleteMessage>(`${this._baseUrl}/auth/delete/${userId}`).subscribe(
      (response: DeleteMessage) => {
        console.log(response); 
        localStorage.removeItem('token');
        localStorage.removeItem('identificacion');
        this._router.navigateByUrl('/home');
        this._authenticationServices.currentUserSignal.set(null);
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  save(user: User): Observable<User | any> {
    return this._httpClient.post(`${this._baseUrl}/auth/nuevo`, user);
  }
}
