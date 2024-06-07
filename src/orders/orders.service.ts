import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders-repository';
import { CreateOrderDto } from './dtos/CreateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(orderDto: CreateOrderDto) {

    return await this.ordersRepository.addOrder(orderDto);
  }

  async getOrder(id: string) {
    return await this.ordersRepository.getOrder(id);
  }
}
