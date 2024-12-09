//proyecto_nest/src/users/users.module.ts
import { forwardRef, Module } from '@nestjs/common'; // Importa el decorador 'Module' y forwarRef, 
import { UsersService } from './users.service'; // Servicio de usuarios
import { UsersController } from './users.controller'; // Controlador de usuarios

import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo de TypeORM
import { User } from './user.entity'; // Entidad de Usuario

import { AuthModule } from '../auth/auth.module'; // Importa AuthModule para la autenticación

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra la entidad User con TypeORM
    forwardRef(() => AuthModule), // Usamos forwardRef para evitar las dependencias circulares
  ], 
  controllers: [UsersController], // Registra el controlador de usuarios
  providers: [UsersService], // Registra el servicio de usuarios
  exports: [UsersService], // Exporta UsersService para ser usado por otros módulos

}) // Crea un módulo vacío, lo que indica que la lógica de usuarios estará aquí
export class UsersModule {}
