import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable } from 'rxjs';

@Injectable()
export class DtoInterceptor implements NestInterceptor {
  constructor(private readonly targetClass: any) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const object = plainToClass(this.targetClass, body);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(`Validation failed: ${errors}`);
    }

    return next.handle();
  }
}
