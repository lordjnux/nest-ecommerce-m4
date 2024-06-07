import { LoglobalMiddleware } from './loglobal.middleware';

describe('LoglobalMiddleware', () => {
  it('should be defined', () => {
    expect(new LoglobalMiddleware()).toBeDefined();
  });
});
