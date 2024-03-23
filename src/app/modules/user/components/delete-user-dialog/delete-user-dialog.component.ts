import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services';
import { AuthenticationService } from 'src/app/modules/authentication/services';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  _userServices: UserService = inject(UserService);
  _authenticationService: AuthenticationService = inject(AuthenticationService);

  deleteAccount(): void {
    const userId = localStorage.getItem('identificacion');
    console.log(`usuario ${userId} eliminado`);
    if (userId){
      this._userServices.delete(userId);
    }
  }
}
