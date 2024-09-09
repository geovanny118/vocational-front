import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/services';
import { Usuario } from '../authentication/models';
import { ResultService } from './services';
import { Results } from './models';
import { LegendPosition } from '@swimlane/ngx-charts';
import { University } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { ChasideTestService } from '../chaside-test/services';
import { HollandTestService } from '../holland-test/services';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  private _router: Router = inject(Router);
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);
  resultServices = inject(ResultService);
  chasideTestService: ChasideTestService = inject(ChasideTestService);
  hollandTestService: HollandTestService = inject(HollandTestService);
  loading: boolean = false;

  view: [number, number] = [500, 350];
  legendPosition = LegendPosition.Below;

  chasideResults: Results[] = [];
  hollandResults: Results[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelectChaside(data: any): void {
    this.loading = true;
    //console.log('chaside');
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    let selectedArea;

    if (typeof data === 'string') {
      selectedArea = data;
    } else if (data && typeof data === 'object') {
      selectedArea = data.name;
    }
    console.log(selectedArea);
    this.chasideTestService.getUniversities(selectedArea).subscribe(
      (response: University) => {
        console.log('Universidades recomendadas:', response);
        this.chasideTestService.currentCareerSignal.set(response?.categorias);
        this.chasideTestService.currentUniversitiesResultSignal.set(response?.cardsUniversidades);
        this._router.navigateByUrl('/chaside/universities').then(() => {
          this.loading = false;
        });
      }
    );
  }

  onSelectHolland(data: any): void {
    this.loading = true;
    //console.log('holland');
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    let selectedName;

    if (typeof data === 'string') {
      selectedName = data;
    } else if (data && typeof data === 'object') {
      selectedName = data.name;
    }
    console.log(selectedName);
    this.hollandTestService.getUniversities(selectedName).subscribe(
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

    this.resultServices.getResultschaside().subscribe({
      next: (response) => {
        //console.log('activo chaside');
        //console.log(response);
        this.chasideResults = response;
      },
      error: () => {
        this.chasideResults = [];
      }
    });

    this.resultServices.getResultsHolland().subscribe({
      next: (responseHolland) => {
        //console.log('activo holland');
        //console.log(responseHolland);
        this.hollandResults = responseHolland;
      },
      error: () => {
        this.hollandResults = [];
      }
    });
  }

  downloadReport(): void {
    const identificacion = localStorage.getItem('identificacion') ?? '';
    this.resultServices.downloadPdf().subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resultado_usuario_${identificacion}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el PDF', error);
    });
  }
}
