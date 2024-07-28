import { Component, inject } from '@angular/core';
import { Usuario } from 'src/app/modules/authentication/models';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { CardsUniversidades, University } from '../../models';
import { MatCardModule } from '@angular/material/card';
import { ChasideTestService } from '../../services';

@Component({
  selector: 'app-test-university',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './test-university.component.html',
  styleUrl: './test-university.component.scss'
})
export class TestUniversityComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);
  chasideTestService: ChasideTestService = inject(ChasideTestService);
  universities: CardsUniversidades[] | undefined | null = this.chasideTestService.currentUniversitiesResultSignal();
  career: string | undefined | null = this.chasideTestService.currentCareerSignal();

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
}
