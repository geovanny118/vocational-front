import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { Usuario } from '../authentication/models';
import { AuthenticationService } from '../authentication/services';
import { ReportService } from './services';
import { Report } from './models';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatTableModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  user: Usuario | undefined;
  authenticationServices: AuthenticationService = inject(AuthenticationService);
  private _reportServices: ReportService = inject(ReportService);
  displayedColumns: string[] = ['#', 'Tipo de informe', 'Acciones'];
  reports: Report[] = [
    { name: 'Usuarios', apiUrl: 'usuarios' },
    { name: 'Universidades', apiUrl: 'universidades' },
    { name: 'Preguntas', apiUrl: 'preguntas' },
    { name: 'Logs', apiUrl: 'logs' }
  ];

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

  downloadReport(report: Report) {
    this._reportServices.downloadFile(report.apiUrl).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      // Obtener la fecha y hora actual en formato deseado
      const today = new Date();
      const date = today.toISOString().slice(0, 10); // Formato YYYY-MM-DD
      const time = today.toTimeString().slice(0, 8).replace(/:/g, '-'); // Formato HH-MM-SS
      // Concatenar la fecha y la hora al nombre del archivo
      a.download = `${report.name}-${date}-${time}.xls`; // Ajusta el nombre y la extensión del archivo según sea necesario
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

}
