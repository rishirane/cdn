import { MasterLimitModule } from './master-limit.module';

describe('MasterLimitModule', () => {
  let masterLimitModule: MasterLimitModule;

  beforeEach(() => {
    masterLimitModule = new MasterLimitModule();
  });

  it('should create an instance', () => {
    expect(masterLimitModule).toBeTruthy();
  });
});
