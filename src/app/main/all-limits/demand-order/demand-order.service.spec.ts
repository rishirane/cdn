import { TestBed, inject } from '@angular/core/testing';

import { DemandOrderService } from './demand-order.service';

describe('DemandOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandOrderService]
    });
  });

  it('should be created', inject([DemandOrderService], (service: DemandOrderService) => {
    expect(service).toBeTruthy();
  }));
});
