import { Injectable, NotFoundException } from '@nestjs/common';
import { CredentialsDto } from './dto/Credentials.dto';
import { UsersRepository } from 'src/users/users-repository';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from './rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtServiec: JwtService,
  ) {}

  async signin(credentials: CredentialsDto) {
    const existUser = await this.usersRepository.findByCredentials(credentials);

    if (!existUser) throw new NotFoundException('Invalid credentials');

    const isValidCredentials = await bcrypt.compare(
      credentials.password,
      existUser.password,
    );

    if (!isValidCredentials) throw new NotFoundException('Invalid credentials');

    const payload = {
      sub: existUser.id,
      id: existUser.id,
      email: existUser.email,
      role: existUser.admin ? Role.Admin : Role.Default,
    };

    const token = this.jwtServiec.sign(payload);

    return { message: 'Sign in successfully', token };
  }

  async signup(userRequest: CreateUserDto) {
    const userCreated = await this.usersRepository.create(userRequest);
    return userCreated;
  }
}
