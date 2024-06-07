import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  /**
   * User name. (Is Optional)
   * @example Jeroham Sanchez
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  /**
   * User email. It is part of the access credentials.
   * (Is Optional)
   * @example jeroham.sanchez@example.com
   */
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * (Is Optional)
   * @example Secure17$
   */
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
    },
  )
  password?: string;

  /**
   * Phone number
   * @example 57605
   */
  @IsOptional()
  @IsInt()
  phone?: number;

  /**
   * Address. (Is optional)
   * @example St. 124 #45-67
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  /**
   * Country name. (Is optional)
   * @example Colombia
   */
  @IsOptional()
  @IsString()
  @Length(5, 20)
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  /**
   * City name. (Is Optional)
   * @example Barranquilla
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}
