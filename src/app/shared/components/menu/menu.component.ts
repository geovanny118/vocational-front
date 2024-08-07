import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  router: Router = inject(Router);
  authenticationService: AuthenticationService = inject(AuthenticationService);

  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }
}
