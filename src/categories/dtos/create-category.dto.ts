import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  /**
   * Cetegory name.
   * @example monitor
   */
  @IsNotEmpty()
  @IsString()
  name: string;
}
