//proyecto_nest/src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,  // Acceder a metadatos de la ruta
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // Obtener roles definidos en el decorador
    if (!roles) {
      return true; // Si no se define un rol, la ruta es accesible por todos
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // El usuario ya debería estar en la solicitud (lo añadimos en el middleware de autenticación)

    // Logs para depuración
    console.log('Usuario autenticado:', user);
    console.log('Roles permitidos para esta ruta:', roles);

    if (!user) {
      throw new UnauthorizedException('No estás autenticado');
    }

    const hasRole = roles.includes(user.role); // Verificar si el usuario tiene uno de los roles permitidos
    if (!hasRole) {
      throw new UnauthorizedException('No tienes permiso para acceder a esta ruta');
    }
    return true;
  }
}
