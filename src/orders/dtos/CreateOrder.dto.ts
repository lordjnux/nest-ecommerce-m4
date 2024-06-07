import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Products } from '../../products/products.entity';

export class CreateOrderDto {
  /**
   * User id (Format: UUID - v4).
   * @example 4095a0d0-361b-475e-a1a4-7be440106699
   */
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

/**
   * Array of products 
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
  products: Partial<Products>[];
}

class PartialProductDto {
  /**
   * Product id (Format: UUID - v4).
   * @example f2ba4c5f-3f71-4752-addf-ea15c9bae372
   */
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
