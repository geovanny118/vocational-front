import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/services';
import { UserService } from './services';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { User } from './models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from './components'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: User | undefined;
  authenticationServices: AuthenticationService = inject(AuthenticationService);
  userServices: UserService = inject(UserService); 
  deleteUserDialog = inject(MatDialog);

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      forkJoin([
        this.authenticationServices.getLoggedInUserInfo(userId),
        this.userServices.search(userId)
      ])
        .subscribe({
          next: ([authenticationResponse, userResponse]) => {
            this.authenticationServices.currentUserSignal.set(authenticationResponse);
            this.user = userResponse;
          },
          error: (error) => {
            console.error('Error fetching user information:', error);
          }
        });
    }
  }

  openDeleteDialog(): void {
    this.deleteUserDialog.open(DeleteUserDialogComponent);
  }
}
