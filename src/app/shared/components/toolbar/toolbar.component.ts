import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  authenticationService: AuthenticationService = inject(AuthenticationService);
  httpClient: HttpClient = inject(HttpClient);
  showTitle: boolean = true;
  router = inject(Router);

  ngOnInit(): void {
    // Suscribirse al evento NavigationEnd para obtener notificaciones cuando cambia la URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Obtener la URL actual
        const currentUrl = this.router.url;
        // URL específica que quieres comparar
        const urlHome = '/home';
        // Lógica para decidir si mostrar o no los elementos basándote en la URL
        this.showTitle = currentUrl === urlHome;
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
