import { Component, inject } from '@angular/core';
import { ChasideTestService } from 'src/app/modules/chaside-test/services';
import { CardsUniversidades, ChasideResult } from '../../models';

@Component({
  selector: 'chaside-test-result',
  standalone: true,
  imports: [],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {
  chasideTestService: ChasideTestService = inject(ChasideTestService);
  chasideResult: ChasideResult | undefined | null = this.chasideTestService.currentChasideResultSignal();
  test: string | undefined = this.chasideResult?.test;
  status: boolean | undefined = this.chasideResult?.status;
  categorias: string | undefined = this.chasideResult?.categorias;
  cantidadUniversidades: number | undefined = this.chasideResult?.cantidadUniversidades;
  cardsUniversidades: CardsUniversidades[] = this.chasideResult?.cardsUniversidades ?? [];
}
