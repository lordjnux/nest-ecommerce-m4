import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[] | any> {
    return await this.categoriesRepository.find();
  }

  async addCategories(name: string) {
    const newCategory = this.categoriesRepository.create({ name });
    return await this.categoriesRepository.save(newCategory);
  }

  async findByName(name: string) {
    return await this.categoriesRepository.findOneBy({ name });
  }

  async findOrCreate(name: string) {
    const category = await this.findByName(name);
    if (!category) return await this.addCategories(name);
    return category;
  }
}
