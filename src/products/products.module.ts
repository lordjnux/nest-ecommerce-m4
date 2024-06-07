import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRespository } from './products-respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { OrderDetails } from '../orders-details/order-detail.entity';
import { Categories } from '../categories/categories.entity';
import { CategoriesRepository } from '../categories/categories-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories, OrderDetails])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRespository, CategoriesRepository],
  exports: [ProductsRespository],
})
export class ProductsModule {}
