import { FacilityDefinitionModule } from './facility-definition.module';

describe('FacilityDefinitionModule', () => {
  let facilityDefinitionModule: FacilityDefinitionModule;

  beforeEach(() => {
    facilityDefinitionModule = new FacilityDefinitionModule();
  });

  it('should create an instance', () => {
    expect(facilityDefinitionModule).toBeTruthy();
  });
});
