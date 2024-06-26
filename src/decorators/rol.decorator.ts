import { SetMetadata } from '@nestjs/common';
import { Role } from '../auth/rol.enum';

export const Roles = (...role: Role[]) => SetMetadata('role', role);
