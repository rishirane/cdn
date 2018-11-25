import { FactorLimitModule } from './factor-limit.module';

describe('FactorLimitModule', () => {
  let factorLimitModule: FactorLimitModule;

  beforeEach(() => {
    factorLimitModule = new FactorLimitModule();
  });

  it('should create an instance', () => {
    expect(factorLimitModule).toBeTruthy();
  });
});
