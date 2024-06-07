import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProduct {
  /**
   * Product name. (Is optional)
   * @example PC Monitor
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  /**
   * Description of product. (Is optional)
   * @example A custom monitor. LED screen, energy consumption reduced, but the display of vivid and defined colors in multimedia content is also guaranteed.
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Price of product. (Is optional)
   * @example 170.89
   */
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  @IsOptional()
  price?: number;

  /**
   * Stock of product. (Is optional)
   * @example 51
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  /**
   * Category product. (Is optional)
   * @example monitor
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * URL of image product. (Is optional)
   * @example https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg
   */
  @IsString()
  @IsOptional()
  imgUrl?: string;
}
