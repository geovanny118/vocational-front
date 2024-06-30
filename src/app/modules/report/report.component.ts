import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { Usuario } from '../authentication/models';
import { AuthenticationService } from '../authentication/services';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatTableModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);
  displayedColumns: string[] = ['#', 'Tipo de informe', 'Acciones'];
  reports: string[] = ['Usuarios', 'Universidades', 'Preguntas'];

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      this.authenticationServices.getLoggedInUserInfo(userId).subscribe({
        next: (response) => {
          this.authenticationServices.currentUserSignal.set(response);
        },
        error: () => {
          this.authenticationServices.currentUserSignal.set(null);
        }
      });
    }
  }

}
