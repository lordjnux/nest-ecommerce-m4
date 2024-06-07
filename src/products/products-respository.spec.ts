import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRespository } from './products-respository';

describe('ProductsRespository', () => {
  let provider: ProductsRespository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsRespository],
    }).compile();

    provider = module.get<ProductsRespository>(ProductsRespository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
