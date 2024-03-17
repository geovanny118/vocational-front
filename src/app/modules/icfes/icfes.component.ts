import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/services';
import { Usuario } from '../authentication/models';

@Component({
  selector: 'app-icfes',
  templateUrl: './icfes.component.html',
  styleUrl: './icfes.component.scss'
})
export class IcfesComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);

  ngOnInit(): void {
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
