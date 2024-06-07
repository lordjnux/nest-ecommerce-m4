import { Role } from '../../rol.enum';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesRequest = this.reflector.getAllAndOverride<Role[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    const user = context.switchToHttp().getRequest().userPayload;

    const hasRoles = rolesRequest.some((role) => user?.role?.includes(role));
    const isValid = user && user.role && hasRoles;

    if (!isValid)
      throw new ForbiddenException(
        'You do not have privileges to access this route',
      );

    return true;
  }
}
