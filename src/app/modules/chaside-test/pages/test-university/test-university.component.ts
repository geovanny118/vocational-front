import { Component, inject } from '@angular/core';
import { Usuario } from 'src/app/modules/authentication/models';
import { AuthenticationService } from 'src/app/modules/authentication/services';

@Component({
  selector: 'app-test-university',
  standalone: true,
  imports: [],
  templateUrl: './test-university.component.html',
  styleUrl: './test-university.component.scss'
})
export class TestUniversityComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);

  ngOnInit() {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      this.authenticationServices.getLoggedInUserInfo(userId).subscribe({
        next: (response) => {
          this.authenticationServices.currentUserSignal.set(response);
        },
        error: () => {
          this.authenticationServices.currentUserSignal.set(null);
        }
      });
    }
  }
}
