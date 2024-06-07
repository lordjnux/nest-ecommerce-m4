import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../orders/orders.entity';
import { Products } from '../products/products.entity';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'order_details' })
export class OrderDetails {
  /**
   * Order detail id(UUID -v4)
   * @example f2ba4c5f-3f71-4752-addf-ea15c9bae372
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * Price of order detail.
   * @example 170.89
   */
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  /**
   * Relations ManyToOne with Orders
   */
  @ManyToOne(() => Orders, (order) => order.orderDetails, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  /**
   * Relations ManyToMany with Products
   */
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: { name: 'order_details_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Products[];
}
