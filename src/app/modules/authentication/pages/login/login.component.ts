import { AuthenticationService } from 'src/app/modules/authentication/services';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authenticationService: AuthenticationService = inject(AuthenticationService);
}
