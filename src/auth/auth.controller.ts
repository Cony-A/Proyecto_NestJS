//proyecto_nest/src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common'; // Importa los decoradores de NestJS
import { AuthService } from './auth.service'; // Servicio que maneja la lógica de autenticación
import { LoginDto } from './dto/login.dto';  // Un DTO para definir los datos de inicio de sesión

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
     /**
   * @route POST /auth/login
   * @description Inicia sesión con el email y la contraseña.
   * @param loginDto - DTO que contiene email y password para la autenticación.
   * @returns Un token JWT para la sesión del usuario.
   */

    // Ruta para el inicio de sesión
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }
}
