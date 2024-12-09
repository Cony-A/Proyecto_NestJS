//proyecto_nest/src/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; 
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';  // Importa JwtModule de NestJS
import { UsersModule } from '../users/users.module'; // Importa el módulo de usuarios
import * as dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

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
