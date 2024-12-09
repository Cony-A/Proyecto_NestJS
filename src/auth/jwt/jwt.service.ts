//proyecto_nest/src/auth/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as JwtLibService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload/jwt-payload';  // Importa la interfaz del payload

// NOTA: Actualmente, se esta usando 'jsonwebtoken' en auth.service para firmar manualmente el token debido a problemas con JwtService.
// La firma manual fue la única solución que funcionó para devolver el token correctamente.

/**
 * @class JwtService
 * @description Este servicio está preparado para generar JWTs utilizando el JwtService de NestJS.
 * Actualmente no se usa, pero se mantiene para una posible reestructuración futura o mejoras en la firma de tokens.
 * En la actualidad, la firma manual se maneja con la librería 'jsonwebtoken'.
 */

@Injectable()
export class JwtService {

    constructor(private jwtService: JwtLibService) {}

    /**
   * @method createToken
   * @description Crea un JWT con el payload proporcionado utilizando JwtService de NestJS.
   * @param payload - La carga útil que contiene los datos del usuario.
   * @returns El token generado.
   */
  
  // Método para crear un JWT
  createToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);  // Genera el token con el payload
  }
}
