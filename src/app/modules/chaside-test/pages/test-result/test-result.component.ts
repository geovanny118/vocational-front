import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChasideTestService } from 'src/app/modules/chaside-test/services';
import { CardsUniversidades, ChasideResult } from '../../models';

@Component({
  selector: 'chaside-test-result',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {
  chasideTestService: ChasideTestService = inject(ChasideTestService);
  chasideResult: ChasideResult | undefined | null = this.chasideTestService.currentChasideResultSignal();
  categorias: string[] = [];

  ngOnInit() {
    if (this.chasideResult?.categorias) {
      this.categorias = this.chasideResult.categorias.split(',').map(categoria => categoria.trim());
    }
  }
}
