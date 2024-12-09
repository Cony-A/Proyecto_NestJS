//proyecto_nest/src/auth/dto/login.dto.ts
import { IsString, IsEmail } from 'class-validator';  // Importa las validaciones de class-validator

export class LoginDto {
  @IsEmail()  // Asegura que el email sea válido  
  email: string;
  
  @IsString()  // Asegura que la contraseña sea una cadena de texto
  password: string;
  }