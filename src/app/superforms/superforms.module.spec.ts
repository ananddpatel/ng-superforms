import { SuperformsModule } from './superforms.module';

describe('SuperformsModule', () => {
  let superformsModule: SuperformsModule;

  beforeEach(() => {
    superformsModule = new SuperformsModule();
  });

  it('should create an instance', () => {
    expect(superformsModule).toBeTruthy();
  });
});
