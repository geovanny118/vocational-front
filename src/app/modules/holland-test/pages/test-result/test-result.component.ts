import { Component, inject } from '@angular/core';
import { HollandTestService } from '../../services';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Usuario } from 'src/app/modules/authentication/models';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { HollandResult, University } from '../../models';
import { ImagenesAreaInteres } from 'src/app/modules/chaside-test/models';
import { Router } from '@angular/router';

@Component({
  selector: 'holland-test-result',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);
  hollandTestService: HollandTestService = inject(HollandTestService);
  hollandResults: HollandResult[] | undefined | null = this.hollandTestService.currentHollandResultSignal();
  loading: boolean = false;
  private _router: Router = inject(Router);

  readonly imagenesAreasDeInteres: ImagenesAreaInteres = {
    'Artista':
      'https://images.unsplash.com/photo-1457295767206-0cb0658056cf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Convencional o Detallista':
      'https://www.tuproyectodevida.pe/wp-content/uploads/2021/01/Carreras-para-personas-detallistas-1200x628.jpg',
    'Realista':
      'https://esencializate.com/wp-content/uploads/2021/07/caritas-optimista-y-pesimista-ser-realista.jpg.webp',
    'Investigador':
      'https://humanidades.com/wp-content/uploads/2018/08/investigador-e1577391446155.jpg',
    'Emprendedor':
      'https://www.godaddy.com/resources/es/wp-content/uploads/sites/9/2020/04/cualidades-de-un-emprendedor.jpg?size=750x0',
    'Social':
      'https://www.canr.msu.edu/contentAsset/image/d2020446-14b2-4ed4-8262-e354397a97e3/fileAsset/filter/Resize,Jpeg/resize_w/750/jpeg_q/80',
  };

  ngOnInit() {
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

  getImageUrl(areaInteres: string): string {
    return this.imagenesAreasDeInteres[areaInteres] || '';
  }

  getUniversities(especialidad: string): void {
    this.loading = true;
    this.hollandTestService.getUniversities(especialidad).subscribe(
      (response: University) => {
        console.log('Universidades recomendadas:', response);
        this.hollandTestService.currentCareerSignal.set(response?.categorias);
        this.hollandTestService.currentUniversitiesResultSignal.set(response?.cardsUniversidades);
        this._router.navigateByUrl('/holland/universities').then(() => {
          this.loading = false;
        });
      }
    );
  }
}
