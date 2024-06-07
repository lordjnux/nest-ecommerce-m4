import { Test, TestingModule } from '@nestjs/testing';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let provider: AuthInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthInterceptor],
    }).compile();

    provider = module.get<AuthInterceptor>(AuthInterceptor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
