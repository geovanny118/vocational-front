import { Component } from '@angular/core';
import { EditPasswordFormComponent } from '../../components';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [EditPasswordFormComponent, MatCardModule, MatProgressBarModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {

}
