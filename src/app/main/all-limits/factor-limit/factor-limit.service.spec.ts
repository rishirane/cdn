import { TestBed, inject } from '@angular/core/testing';

import { FactorLimitService } from './factor-limit.service';

describe('FactorLimitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactorLimitService]
    });
  });

  it('should be created', inject([FactorLimitService], (service: FactorLimitService) => {
    expect(service).toBeTruthy();
  }));
});
