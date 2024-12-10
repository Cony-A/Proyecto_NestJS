//proyecto_nest/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable
import * as bcrypt from 'bcrypt'; // Importa la librería bcrypt para comparar y cifrar contraseñas
//import { JwtService } from '@nestjs/jwt'; // Importa el JwtService de NestJS para trabajar con JWT
import { UsersService } from '../users/users.service'; // Importamos UsersService
import { LoginDto } from './dto/login.dto'; // Importa el DTO
import * as jwt from 'jsonwebtoken';  // Importa jsonwebtoken para la firma manual

// NOTA: Se usa 'jsonwebtoken' para firmar manualmente el token debido a problemas con JwtService de NestJS.
// La firma manual fue la única solución que funcionó para devolver el token correctamente.
// Se conserva JwService en el código como parte de la documentación y/o para posibles usos a futuro o correciones
//Para usar jsonwebtoken, descargar dependencias: npm install jsonwebtoken

@Injectable()
export class AuthService {
  constructor(
    //private readonly jwtService: JwtService, // Inyecta el JwtService para generar tokens JWT (actualmente no se esta utilizando)
    private readonly usersService: UsersService,  // Inyectamos UsersService
  ) {}

  /**
   * @route POST /auth/login
   * @description Inicia sesión y genera un token JWT.
   * @param loginDto - DTO con los datos de login (email y password).
   * @returns El token JWT generado.
   */

  // Método para el inicio de sesión que devuelve un token JWT
  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto; // Extrae email y password del DTO

    console.log('Intentando iniciar sesión para el usuario:', email);  // Log para verificar los datos

    // Aquí usamos el UsersService para obtener al usuario desde la base de datos
    const user = await this.usersService.findByEmail(email); // Ahora buscamos el usuario real
    if (!user) {
      console.error('Usuario no encontrado:', email);  // Log para ver si el usuario no existe
      throw new Error('Usuario no encontrado');
    }

    console.log('Usuario encontrado:', user);  // Log para verificar que el usuario se encontró

    // Compara la contraseña proporcionada con el hash almacenado en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Contraseña válida:', isPasswordValid);  // Log para verificar si la contraseña es válida

    if (!isPasswordValid) {
      console.error('Contraseña incorrecta para el usuario:', email);  // Log si la contraseña no es válida
      throw new Error('Contraseña incorrecta');
    }

    // Verificar que la clave secreta esté definida y sea un string
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || typeof jwtSecret !== 'string') {
      throw new Error('JWT_SECRET no está definida en el archivo .env');
    }

    // Firma manualmente el token usando jsonwebtoken con la clave secreta cargada desde .env
    const payload = { email: user.email, id: user.id, role: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    console.log('Token generado manualmente:', token);  // Log para verificar el token generado
    return token; // Devuelve el token JWT
  }
}
