import { TestBed, inject } from '@angular/core/testing';

import { FacilityDefinitionService } from './facility-definition.service';

describe('FacilityDefinitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacilityDefinitionService]
    });
  });

  it('should be created', inject([FacilityDefinitionService], (service: FacilityDefinitionService) => {
    expect(service).toBeTruthy();
  }));
});
