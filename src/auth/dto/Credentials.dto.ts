import { CreateUserDto } from '../../users/dtos/CreateUser.dto';
import { PickType } from '@nestjs/mapped-types';

export class CredentialsDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
