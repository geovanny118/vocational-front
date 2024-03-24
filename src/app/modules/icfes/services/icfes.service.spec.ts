import { TestBed } from '@angular/core/testing';

import { IcfesService } from './icfes.service';

describe('IcfesService', () => {
  let service: IcfesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcfesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
