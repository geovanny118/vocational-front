import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from '../../components';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

}
