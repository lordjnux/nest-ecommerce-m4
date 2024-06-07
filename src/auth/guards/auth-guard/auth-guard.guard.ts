import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtServiec: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedException(
        'Invalid authorization header format. Bearer token not found.',
      );
    }

    try {
      const token = parts[1];
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtServiec.verify(token, { secret });

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      request.userPayload = payload;
      return true;
    } catch (error: any) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
