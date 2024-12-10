//proyecto_nest/src/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; 
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';  // Importa JwtModule de NestJS
import { UsersModule } from '../users/users.module'; // Importa el módulo de usuarios
import * as dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

// NOTA: Se usó 'jsonwebtoken' para firmar manualmente y verificar el token JWT debido a problemas con JwtService de NestJS.
// La firma manual fue la única solución que funcionó para devolver el token correctamente.
// Se conserva JwService en el código como parte de la documentación y/o para posibles usos a futuro o correciones
//Se decidió conservar el código auth.module con JwtService para no alterar otras posibles funcionalidades
//Para usar jsonwebtoken, descargar dependencias: npm install jsonwebtoken

// Cargar variables de entorno desde el archivo .env
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Cargar la clave secreta desde .env
      signOptions: { expiresIn: '1h' }, // Duración del token (opcional)
    }),
    forwardRef(() => UsersModule), // Para resolver la dependencia circular
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController], // Registrar el controlador de autenticación
  exports: [ AuthService, JwtService, JwtModule], // Exportar JwtService, JwtModule y AuthService para ser usados en otros módulos
})
export class AuthModule {}
