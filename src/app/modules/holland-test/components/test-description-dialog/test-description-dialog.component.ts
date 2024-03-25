import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-test-description-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './test-description-dialog.component.html',
  styleUrl: './test-description-dialog.component.scss'
})
export class TestDescriptionDialogComponent {

}
