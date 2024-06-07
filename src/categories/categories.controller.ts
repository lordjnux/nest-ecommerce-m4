import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.create(category.name);
  }

  @Post('seeder')
  async seedCategories() {
    const result = await this.categoriesService.seedCategories();
    if (result <= 0)
      throw new InternalServerErrorException(
        'Ocurió un error inesperado. Categorias no creados.',
      );

    return `Categorias creadas correctamente`;
  }
}
