import { TestBed, inject } from '@angular/core/testing';

import { MasterLimitService } from './master-limit.service';

describe('MasterLimitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterLimitService]
    });
  });

  it('should be created', inject([MasterLimitService], (service: MasterLimitService) => {
    expect(service).toBeTruthy();
  }));
});
