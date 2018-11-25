import { AllLimitsModule } from './all-limits.module';

describe('AllLimitsModule', () => {
  let allLimitsModule: AllLimitsModule;

  beforeEach(() => {
    allLimitsModule = new AllLimitsModule();
  });

  it('should create an instance', () => {
    expect(allLimitsModule).toBeTruthy();
  });
});
