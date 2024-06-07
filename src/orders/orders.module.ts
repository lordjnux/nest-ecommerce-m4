import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrderDetails } from '../orders-details/order-detail.entity';
import { Products } from '../products/products.entity';
import { Users } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, Users])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
