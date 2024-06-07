import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProduct } from './dtos/UpdateProducts.dto';
import { CategoriesRepository } from '../categories/categories-repository';
import { preloadProducts } from '../dbConfig/preload-data';

@Injectable()
export class ProductsRespository {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async update(id: string, updateProduct: UpdateProduct) {
    const existProduct = await this.findById(id);
    if (!existProduct) throw new NotFoundException(`Product(${id}) not found`);

    const category = await this.categoriesRepository.findOrCreate(
      updateProduct.category,
    );

    const productToUpdate = await this.productRepository.merge(existProduct, {
      ...updateProduct,
      category,
    });

    return await this.productRepository.save(productToUpdate);
  }

  async create(productDto: CreateProductDto) {
    const category = await this.categoriesRepository.findByName(
      productDto.category,
    );

    if (!category)
      throw new BadRequestException(
        `Category(${productDto.category}) doesn't exist.`,
      );
    const product = await this.productRepository.create({
      ...productDto,
      category,
    });
    return await this.productRepository.save(product);
  }

  async findById(id: string) {
    return await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async findByName(name: string) {
    return await this.productRepository.findOne({
      where: { name },
      relations: { category: true },
    });
  }

  async findAll(): Promise<Products[] | any> {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }

  async createSeed(): Promise<number> {
    let totalCreated: number = 0;
    try {
      for (const product of preloadProducts) {
        const existProduct = await this.findByName(product.name);
        if (!existProduct) {
          const category = await this.categoriesRepository.findOrCreate(
            product.category,
          );

          const productToCreate: Partial<Products> = { ...product, category };

          const productToSave =
            await this.productRepository.create(productToCreate);

          const result = await this.productRepository.save(productToSave);
          totalCreated = result ? totalCreated + 1 : totalCreated;
        }
      }
    } catch (error: any) {
      totalCreated = -1;
      console.error(`Products Seeder Fatal Error: ${error}`);
    } finally {
      return totalCreated;
    }
  }

  async updateImage(id:string,  url:string){
    const existProduct = await this.findById(id);
    if (!existProduct) throw new NotFoundException(`Product(${id}) not found`);
    existProduct.imgUrl = url;
    return await this.productRepository.save(existProduct);
  }
}
