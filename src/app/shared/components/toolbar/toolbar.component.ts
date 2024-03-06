import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  router = inject(Router);
  showTitleSignal = signal<boolean>(false);
  httpClient: HttpClient = inject(HttpClient);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  username: string | undefined = '';

  constructor() {
    // Suscribirse al evento NavigationEnd para obtener notificaciones cuando cambia la URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Obtener la URL actual
        const currentUrl = this.router.url;
        // URL específica que quieres comparar
        const urlHome = '/home';
        // Lógica para decidir si mostrar o no los elementos basándote en la URL
        this.showTitleSignal.set(currentUrl === urlHome);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
