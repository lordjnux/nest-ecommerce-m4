import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProduct } from './dtos/UpdateProducts.dto';
import { AuthGuard } from '../auth/guards/auth-guard/auth-guard.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Role } from '../auth/rol.enum';
import { Roles } from '../decorators/rol.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Post()
  async create(@Body() productDto: CreateProductDto) {
    return await this.productsService.create(productDto);
  }

  @Post('seeder')
  async seedProducts() {
    const result = await this.productsService.seedProducts();

    if (result <= 0)
      throw new InternalServerErrorException(
        'Unexpected error. Products not created.',
      );

    return `Products created successfully!`;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.productsService.findOne(id);
    if (!result) throw new NotFoundException(`Product(${id}) not found.`);
    return result;
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProduct: UpdateProduct,
  ) {
    return await this.productsService.update(id, updateProduct);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.remove(id);
  }
}
