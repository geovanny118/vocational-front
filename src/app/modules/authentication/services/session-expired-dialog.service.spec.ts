import { TestBed } from '@angular/core/testing';

import { SessionExpiredDialogService } from './session-expired-dialog.service';

describe('SessionExpiredDialogService', () => {
  let service: SessionExpiredDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionExpiredDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
