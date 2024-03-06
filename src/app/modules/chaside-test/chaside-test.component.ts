import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/services';
import { Usuario } from '../authentication/models';

@Component({
  selector: 'app-chaside-test',
  templateUrl: './chaside-test.component.html',
  styleUrl: './chaside-test.component.scss'
})
export class ChasideTestComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      this.authenticationServices.getLoggedInUserInfo(userId).subscribe({
        next: (response) => {
          //console.log('response', response);
          this.authenticationServices.currentUserSignal.set(response);
        },
        error: () => {
          this.authenticationServices.currentUserSignal.set(null);
        }
      });
    }
  }
}
