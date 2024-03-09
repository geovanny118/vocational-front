import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-test-description',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-test-description.component.html',
  styleUrl: './dialog-test-description.component.scss'
})
export class DialogTestDescriptionComponent {

}
