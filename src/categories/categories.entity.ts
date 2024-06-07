// src/categories/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from '../products/products.entity';

@Entity('categories')
export class Categories {
  /**
   * Category id(UUID -v4)
   * @example f2ba4c5f-3f71-4752-addf-ea15c9bae372
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Cetegory name.
   * @example monitor
   */
  @Column({ type: 'varchar', length: 50 })
  name: string;

  /**
   * Relations OneToMany with Products
   * @example monitor
   */
  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
