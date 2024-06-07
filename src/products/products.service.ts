import { ConflictException, Injectable } from '@nestjs/common';
import { ProductsRespository } from './products-respository';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProduct } from './dtos/UpdateProducts.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRespository) {}

  async remove(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  async update(id: string, updateProduct: UpdateProduct) {
    return await this.productsRepository.update(id, updateProduct);
  }

  async findOne(id: string) {
    return await this.productsRepository.findById(id);
  }

  async create(productDto: CreateProductDto) {
    const existsProduct = await this.productsRepository.findByName(
      productDto.name,
    );
    if (existsProduct) throw new ConflictException('Product already exist.');
    return await this.productsRepository.create(productDto);
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }

  async seedProducts(): Promise<number> {
    return await this.productsRepository.createSeed();
  }
}
