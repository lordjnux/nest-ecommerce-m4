import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories-repository';
import { preloadCategories } from '../dbConfig/preload-data';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriestRepository: CategoriesRepository) {}

  async create(name: string) {
    const newCategory = await this.categoriestRepository.findByName(name);

    if (newCategory) return newCategory;

    return await this.categoriestRepository.addCategories(name);
  }

  async findAll() {
    return await this.categoriestRepository.getCategories();
  }

  async seedCategories(): Promise<number> {
    let totalCreated: number = 0;
    try {
      for (const categoryName of preloadCategories) {
        await this.create(categoryName);
        totalCreated += 1;
      }
    } catch (error: any) {
      totalCreated = -1;
      console.error(`Products Seeder Fatal Error: ${error}`);
    } finally {
      return totalCreated;
    }
  }
}
