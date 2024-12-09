//proyecto_nest/src/auth/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as JwtLibService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload/jwt-payload';  // Importa la interfaz del payload

@Injectable()
export class JwtService {

    constructor(private jwtService: JwtLibService) {}

  // Método para crear un JWT
  createToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);  // Genera el token con el payload
  }
}
