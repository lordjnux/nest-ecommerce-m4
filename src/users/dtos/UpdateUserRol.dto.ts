import { Role } from '../../auth/rol.enum';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserRolDto {
  /**
   * Id of user. (UUID - v4)
   * @example 5b70f51f-67ed-4524-ae4f-e056c78c7fa3
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  /**
   * Role value to set the user
   * @example visitor
   */
  @IsEnum(Role)
  rol: Role;

  /**
   * The secret key. Contact the Admin system to get this value.
   */
  @IsNotEmpty()
  @IsString()
  secret: string;
}
