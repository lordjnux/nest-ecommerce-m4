import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from '../orders-details/order-detail.entity';
import { v4 as uuid } from 'uuid';
import { Users } from '../users/user.entity';

@Entity({ name: 'orders' })
export class Orders {
  /**
   * Order id(UUID -v4)
   * @example f2ba4c5f-3f71-4752-addf-ea15c9bae372
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * Date of order .
   * @example 2024-06-04 18:41:22
   */
  @Column()
  date: Date;

  /**
   * Relations ManyToOne with Users
   */
  @ManyToOne(() => Users, (user) => user.id)
  userId: Users;

  /**
   * Relations OneToMany with OrderDetails
   */
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];
}
