import { Injectable, NotFoundException } from '@nestjs/common';
import { Orders } from './orders.entity';
import { DataSource, In, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { Products } from '../products/products.entity';
import { OrderDetails } from '../orders-details/order-detail.entity';
import { Users } from '../users/user.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async addOrder(orderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //! 1. Busca a un usuario por id.
      const user = await this.usersRepository.findOneBy({
        id: orderDto.userId,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      //! 2. Crea un registro en la tabla orders con el usuario encontrado.
      const order = this.ordersRepository.create({
        userId: user,
        date: new Date(),
      });

      //! 3. Busca los productos por id recibidos en la request
      const productIds = orderDto.products.map((product) => product.id);
      const products = await this.productsRepository.findBy({
        id: In(productIds),
        stock: MoreThan(0),
      });

      if (products.length !== productIds.length) {
        throw new NotFoundException(
          'Some products are duplicated, out of stock or not found',
        );
      }

      //! Calcular el total de la compra y reducir el stock del producto correspondiente
      let totalPrice: number = 0;
      products.forEach((product) => {
        totalPrice += Number(product.price);
        product.stock -= 1;
      });

      //! Actualizar los productos con el nuevo stock
      await queryRunner.manager.save(products);

      //! 4. Construye y registra un detalle de compra con los productos seleccionados
      const savedOrder = await queryRunner.manager.save(order);

      const orderDetails = products.map((product) => {
        const orderDetail = new OrderDetails();
        orderDetail.price = product.price;
        orderDetail.order = savedOrder;
        orderDetail.products = [product];
        return orderDetail;
      });

      await queryRunner.manager.save(orderDetails);

      //! 5. Devuelve la orden de compra con el precio y id del detalle de compra
      await queryRunner.commitTransaction();
      return {
        orderId: savedOrder.id,
        totalPrice: totalPrice,
        orderDetails: orderDetails.map((detail) => ({
          id: detail.id,
          price: detail.price,
        })),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrder(id: string): Promise<Orders | any> {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
