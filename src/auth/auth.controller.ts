import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/Credentials.dto';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() credentials: CredentialsDto) {
    const result = await this.authService.signin(credentials);

    if (!result) throw new NotFoundException('Invalid credentials');

    return result;
  }

  @Post('signup')
  @HttpCode(200)
  async signup(@Body() userRequest: CreateUserDto) {
    const result = await this.authService.signup(userRequest);
    return result;
  }
}
