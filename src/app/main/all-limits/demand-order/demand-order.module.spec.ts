import { DemandOrderModule } from './demand-order.module';

describe('DemandOrderModule', () => {
  let demandOrderModule: DemandOrderModule;

  beforeEach(() => {
    demandOrderModule = new DemandOrderModule();
  });

  it('should create an instance', () => {
    expect(demandOrderModule).toBeTruthy();
  });
});
