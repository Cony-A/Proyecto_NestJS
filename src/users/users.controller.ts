
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
  @Get('profile')
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



/*
// src/users/users.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'; // Importa decoradores y guards
import { UsersService } from './users.service'; // Servicio de usuarios
import { Roles } from '../auth/roles.decorator'; // Importa el decorador Roles
import { RolesGuard } from '../auth/roles.guard'; // Importa el guardia RolesGuard
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Ruta base
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para registrar un usuario
  @Post('register')  // Ruta específica: POST /users/register
  async register(
    @Body('email') email: string,  //email como cadena de texto
    @Body('name') name: string,    //nombre como cadena de texto
    @Body('password') password: string, //contraseña como cadena de texto
    @Body('role') role: string = 'user', //rol del usuario como cadena de texto, puede ser usuario o administrador
  ) {
    return this.usersService.createUser(email, name, password, role);
  }

  // Ruta para obtener el perfil de un usuario
  @Get('profile')
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

*/
