import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersRepository } from 'src/users/users-repository';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly usersRepository: UsersRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { email, password } = request.body;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const userExists = await this.usersRepository.findByCredentials({
      email,
      password,
    });
    if (!userExists) {
      throw new NotFoundException('Incorrect email or password');
    }

    return next.handle();
  }
}
