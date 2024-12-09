//proyecto_nest/src/users/users.service.ts
import { Injectable } from '@nestjs/common'; // Importa los decoradores y clases necesarias 
import { InjectRepository } from '@nestjs/typeorm'; // Importa los decoradores y clases necesarias 
import { Repository } from 'typeorm'; // Importa los decoradores y clases necesarias 
import { User } from './user.entity'; // Entidad de usuario
import * as bcrypt from 'bcrypt'; // Librería para cifrar contraseñass

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>, // Inyecta el repositorio de la entidad de User para la base de datos
  ) {}

  // Crear un nuevo usuario
  async createUser(email: string, name: string, password: string, role: string = 'user'): Promise<User> {
    
    // Verifica si el correo ya existe en la base de datos
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Cifra la contraseña antes de guardarla con un salt de 10 rondas
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea una nueva instancia de usuario con los datos proporcionados
    const newUser = this.usersRepository.create({
      email,
      name,
      password: hashedPassword, // Guarda la contraseña cifrada
      role,
    });

    return this.usersRepository.save(newUser); // Guarda el nuevo usuario en la base de datos
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Este método para login puede ser gestionado en `AuthService`, no es necesario en `UsersService`
}
