import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * User name
   * @example Jeroham Sanchez
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * User email. It is part of the access credentials.
   * @example jeroham.sanchez@example.com
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(200)
  email: string;

  /**
   * Password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @ApiProperty()
  @IsNotEmpty()
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
  password: string;

  /**
   * Confirm password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters
   * @example Secure17$
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Confirm password must contain at least one lowercase letter, one uppercase letter, one number, one of the following special characters: !@#$%^&*, and length between 8 and 15 characters',
    },
  )
  confirmPassword: string;

  /**
   * Phone number
   * @example 57605
   */
  @IsNotEmpty()
  @IsInt()
  phone: number;

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
