//proyecto_nest/src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

// Este decorador guardará los roles permitidos en las rutas protegidas
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
