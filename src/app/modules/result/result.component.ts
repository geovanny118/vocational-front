import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/services';
import { Usuario } from '../authentication/models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);

  view: [number, number] = [1000, 700];

  single = [
    {
      "name": "Artistico",
      "value": 8
    },
    {
      "name": "Tecnico",
      "value": 5
    },
    {
      "name": "Salud",
      "value": 6
    }
  ];

  single_two = [
    {
      "name": "Area de Ciencias de la Salud",
      "value": 30
    },
    {
      "name": "Areas de Enseñanzas Tpecnicas",
      "value": 70
    }
  ];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    //Object.assign(this, { this.single });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
  }
}
