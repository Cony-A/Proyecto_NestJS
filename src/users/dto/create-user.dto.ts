// Ruta: src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';  // Importa las validaciones de class-validator

export class CreateUserDto {
  @IsEmail()  // Valida que el correo sea correcto
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' }) // Asegura que el email no esté vacío
  email: string;

  @IsString()  // Asegura que el nombre sea una cadena de texto
  @IsNotEmpty({ message: 'El nombre es obligatorio' })  // Asegura que el nombre no esté vacío
  name: string;

  @IsString()  // Asegura que la contraseña sea una cadena de texto
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })  // Asegura que la contraseña no esté vacía
  password: string;

  @IsString()  // Asegura que el rol sea una cadena de texto
  @IsNotEmpty({ message: 'El rol es obligatorio' })  // Asegura que el rol no esté vacío
  role: string;
}