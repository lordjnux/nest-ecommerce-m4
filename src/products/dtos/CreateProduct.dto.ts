import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  /**
   * Product name.
   * @example PC Monitor
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  /**
   * Description of product.
   * @example A custom monitor. LED screen, energy consumption reduced, but the display of vivid and defined colors in multimedia content is also guaranteed.
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Price of product.
   * @example 170.89
   */
  @IsNotEmpty()
  @IsDecimal()
  @IsNumberString()
  price: number;

  /**
   * Stock of product.
   * @example 51
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  stock: number;

  /**
   * Category product. 
   * @example monitor
   */
  @IsNotEmpty()
  @IsString()
  category: string;

  /**
   * URL of image product. (Is optional)
   * @example https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg
   */
  @IsString()
  @IsOptional()
  imgUrl?: string;
}
