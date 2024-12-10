
// src/users/users.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'; // Importa decoradores y guards
import { UsersService } from './users.service'; // Servicio de usuarios
import { Roles } from '../auth/roles.decorator'; // Importa el decorador Roles
import { RolesGuard } from '../auth/roles.guard'; // Importa el guardia RolesGuard
import { CreateUserDto } from './dto/create-user.dto'; // Importa el DTO para crear un usuario

@Controller('users') // Ruta base
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @route POST /users/register
   * @description Crea un nuevo usuario.
   * @param createUserDto - DTO que contiene email, name, password y role para crear un usuario.
   * @returns El usuario creado.
   */

  @Post('register')  // Ruta específica: POST /users/register
  async register(@Body() createUserDto: CreateUserDto) { // Usamos el DTO CreateUserDto
    return this.usersService.createUser(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
      createUserDto.role,
    );
  }

  // Ruta para obtener el perfil de un usuario
  @Get('profile') //endpoint /users/profile
  @Roles('user', 'admin')  // Esta ruta solo podrá ser accedida por usuarios con rol 'user' o 'admin'
  @UseGuards(RolesGuard)  // Aplica el guardia de roles
  async getProfile() {
    return { message: 'Perfil de usuario' };  // Respuesta
  }

  // Ruta para obtener datos de administrador
  @Get('admin') // Aquí definimos el endpoint /users/admin
  @Roles('admin')  // Solo los administradores pueden acceder a esta ruta
  @UseGuards(RolesGuard)  // Aplica el guardia de roles
  async getAdminData() {
    return { message: 'Solo admin puede ver esto' };  // Respuesta al intentar obtener datos de administrador
  }
}
