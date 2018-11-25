import { LimitsModule } from './limits.module';

describe('LimitsModule', () => {
  let limitsModule: LimitsModule;

  beforeEach(() => {
    limitsModule = new LimitsModule();
  });

  it('should create an instance', () => {
    expect(limitsModule).toBeTruthy();
  });
});
