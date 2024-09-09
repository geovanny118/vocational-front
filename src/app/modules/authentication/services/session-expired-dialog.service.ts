import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponent } from '../components';

@Injectable({
  providedIn: 'root'
})
export class SessionExpiredDialogService {

  dialog: MatDialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(SessionExpiredDialogComponent, {
      width: '300px',
      disableClose: true
    });
  }
}
