import { Component, inject } from '@angular/core';
import { ChasideTestService } from 'src/app/modules/chaside-test/services';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {
  chasideTestService: ChasideTestService = inject(ChasideTestService);
}
