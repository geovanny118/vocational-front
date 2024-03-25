import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/services';
import { Usuario } from '../authentication/models';
import { TestDescriptionDialogComponent } from './components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-holland-test',
  templateUrl: './holland-test.component.html',
  styleUrl: './holland-test.component.scss'
})
export class HollandTestComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);
  testDescriptionDialog = inject(MatDialog);

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

  openTestDescription(): void {
    this.testDescriptionDialog.open(TestDescriptionDialogComponent);
  }
}
