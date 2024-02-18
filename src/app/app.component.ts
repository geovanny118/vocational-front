import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ToolbarComponent, FooterComponent, MenuComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToolbarComponent, 
    FooterComponent,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  authenticationService: AuthenticationService = inject(AuthenticationService);
  title = 'vocational-app';
}
