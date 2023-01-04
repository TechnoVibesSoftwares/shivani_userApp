import { TestBed } from '@angular/core/testing';

import { ForgotPassWordService } from './forgot-pass-word.service';

describe('ForgotPassWordService', () => {
  let service: ForgotPassWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPassWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
