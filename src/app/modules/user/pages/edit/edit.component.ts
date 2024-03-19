import { Component } from '@angular/core';
import { EditFormComponent } from '../../components';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [EditFormComponent, MatCardModule, MatProgressBarModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

}
