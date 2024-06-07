import { Orders } from '../orders/orders.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class Users {
  /**
   * User id(UUID -v4)
   * @example f2ba4c5f-3f71-4752-addf-ea15c9bae372
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * User name
   * @example Jeroham Sanchez
   */
  @Column({ length: 50, nullable: false })
  name: string;

  /**
   * User email. It is part of the access credentials.
   * @example jeroham.sanchez@example.com
   */
  @Column({ unique: true, length: 50, nullable: false })
  email: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @Exclude({ toPlainOnly: true })
  @Column({ length: 255, nullable: false, select: false })
  password: string;

  /**
   * Address. (Is optional)
   * @example St. 124 #45-67
   */
  @Column({ nullable: true })
  address?: string;

  /**
   * Phone number (Is optional)
   * @example 57605
   */
  @Column({ nullable: true })
  phone?: number;

  /**
   * Country name. (Is optional)
   * @example Colombia
   */
  @Column({ nullable: true })
  country?: string;

  /**
   * City name. (Is Optional)
   * @example Barranquilla
   */
  @Column({ nullable: true })
  city?: string;

  /**
   * Relations OneToMany with Orders
   */
  @OneToMany(() => Orders, (order) => order.userId)
  orders: Orders[];

  /**
   * This field is used by internals cheks.
   */
  @Column({ default: false, select: false })
  admin: boolean;
}
