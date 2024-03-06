import { SetMetadata } from '@nestjs/common';
import type { Role } from 'src/shared/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
