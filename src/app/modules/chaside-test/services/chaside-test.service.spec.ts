import { TestBed } from '@angular/core/testing';

import { ChasideTestService } from './chaside-test.service';

describe('ChasideTestService', () => {
  let service: ChasideTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChasideTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
