import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test-description-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './test-description-dialog.component.html',
  styleUrl: './test-description-dialog.component.scss'
})
export class TestDescriptionDialogComponent {

}
