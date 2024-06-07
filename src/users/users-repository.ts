import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CredentialsDto } from '../auth/dto/Credentials.dto';
import { Role } from '../auth/rol.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findAll(page: number = 1, limit: number = 5): Promise<Users[] | any> {
    const [result, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        admin: true,
      },
    });

    const users = result.map((user) => plainToClass(Users, user));

    return {
      data: users,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Users | any> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) {
      return null;
    }

    const userWithOrders = {
      ...user,
      orders: user.orders.map((order) => ({
        id: order.id,
        date: format(new Date(order.date), 'yyyy-MM-dd HH:mm:ss'),
      })),
    };

    return plainToClass(Users, userWithOrders);
  }

  async findByEmail(email: string): Promise<Users | any> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findByCredentials(credentials: CredentialsDto) {
    const user = await this.usersRepository.findOne({
      select: { id: true, email: true, password: true, admin: true },
      where: {
        email: credentials.email,
      },
    });
    return user;
  }

  async create(userRequest: CreateUserDto) {
    const existUser = await this.findByEmail(userRequest.email);
    if (existUser)
      throw new ConflictException('Already exist an user with this email');

    const hashPass = await bcrypt.hash(userRequest.password, 10);

    if (!hashPass)
      throw new InternalServerErrorException("Password can't not be hashed");

    userRequest.password = hashPass;
    const userToSave = plainToClass(Users, userRequest);

    const userCreated = await this.usersRepository.save(userToSave);

    const userWithoutPassword = {
      ...userCreated,
      password: undefined,
      confirmPassword: undefined,
    };
    return plainToClass(Users, userWithoutPassword);
  }

  async update(id: string, userUpdated: Partial<Users>) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User(${id}) not found.`);

    const updatedUser = Object.assign(user, userUpdated);
    return plainToClass(Users, await this.usersRepository.save(updatedUser));
  }

  async setRol(id: string, rol:Role) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User(${id}) not found.`);

    console.log("rol:", rol);
    console.log("admin:", rol == Role.Admin);
    
    user.admin = rol == Role.Admin;

    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
