import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users-repository';
import { Users } from './user.entity';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { Role } from '../auth/rol.enum';

@Injectable()
export class UsersService {
  
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(page: number = 1, limit: number = 5) {
    return await this.usersRepository.findAll(page, limit);
  }

  async findOne(id: string) {
    const result = await this.usersRepository.findById(id);

    return result ?? null;
  }

  async update(id: string, userDto: UpdateUserDto) {
    const userUpdated = await this.usersRepository.update(id, userDto);
    const userWithoutPassword = { ...userUpdated, password: undefined };
    return plainToClass(Users, userWithoutPassword);
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }

  async findByEmail(email: string) {
    const result = await this.usersRepository.findByEmail(email);

    return result ?? null;
  }
  
  async setRol(id: string, rol: Role) {
    const userUpdated = await this.usersRepository.setRol(id, rol);
    const userWithoutPassword = { ...userUpdated, password: undefined };
    return userWithoutPassword;
  }
}
