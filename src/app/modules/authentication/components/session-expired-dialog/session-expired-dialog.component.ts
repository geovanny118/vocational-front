import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-session-expired-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './session-expired-dialog.component.html',
  styleUrl: './session-expired-dialog.component.scss'
})
export class SessionExpiredDialogComponent {

  onClose(): void {
    window.location.href = '/authentication/login';
  }
}
