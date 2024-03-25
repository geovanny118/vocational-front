import { Component, inject } from '@angular/core';
import { HollandTestService } from '../../services';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {
  hollandTestService: HollandTestService = inject(HollandTestService);
}
