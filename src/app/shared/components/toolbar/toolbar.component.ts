import { Component, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  private _authenticationService: AuthenticationService = inject(AuthenticationService);

  isLoggedIn(): boolean {
    return this._authenticationService.isLoggedIn();
  }

  logout(): void {
    this._authenticationService.logout();
  }
}
