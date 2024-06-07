import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { OrderDetails } from '../orders-details/order-detail.entity';
import { v4 as uuid } from 'uuid';

@Entity('products')
export class Products {
  /**
   * Product id(UUID -v4)
   * @example f2ba4c5f-3f71-4752-addf-ea15c9bae372
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * Product name.
   * @example PC Monitor
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * Description of product.
   * @example A custom monitor. LED screen, energy consumption reduced, but the display of vivid and defined colors in multimedia content is also guaranteed.
   */
  @Column('text', { nullable: false })
  description: string;

  /**
   * Price of product.
   * @example 170.89
   */
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * Stock of product.
   * @example 51
   */
  @Column('int', { nullable: false })
  stock: number;

  /**
   * URL of image product. (Is optional)
   * @example https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg
   */
  @Column({
    type: 'varchar',
    default: 'https://agrimart.in/uploads/vendor_banner_image/default.jpg',
  })
  imgUrl?: string;

  /**
   * Relations ManyToOne with Category
   * @example monitor
   */
  @ManyToOne(() => Categories, (category) => category.products, {
    nullable: false,
  })
  category: Categories;

  /**
   * Relations ManyToMany with Order.
   */
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
