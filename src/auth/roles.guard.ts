//proyecto_nest/src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'; // Importa el decorador Injectable para marcar la clase como un proveedor inyectable.
import { Observable } from 'rxjs'; // Importa la interfaz Observable para definir tipos de retorno asíncronos en el guardia.
import { Reflector } from '@nestjs/core'; // Importa Reflector para acceder a los metadatos de los decoradores como @Roles.

// NOTA: Se usó 'jsonwebtoken' en auth.service para firmar manualmente el token debido a problemas con JwtService de NestJS.
// La firma manual fue la única solución que funcionó para devolver el token correctamente.
// JwtService se mantiene en el constructor para facilitar una futura solución

/**
 * @class RolesGuard
 * @description Guard que protege las rutas según los roles definidos en el decorador @Roles.
 *              Verifica si el usuario autenticado tiene el rol adecuado para acceder a la ruta.
 */

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    
    private reflector: Reflector,  // Acceder a metadatos de la ruta
  ) {}

  /**
   * @method canActivate
   * @description Verifica si el usuario tiene un rol autorizado para acceder a la ruta.
   * @param context - Contexto de la ejecución de la solicitud HTTP.
   * @returns true si el usuario tiene el rol necesario; de lo contrario, lanza UnauthorizedException.
   */

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
