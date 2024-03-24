import { TestBed } from '@angular/core/testing';

import { HollandTestService } from './holland-test.service';

describe('HollandTestService', () => {
  let service: HollandTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HollandTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
