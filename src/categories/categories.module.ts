//proyecto_nest/src/categories/categories.module.ts
import { Module } from '@nestjs/common'; //Importa decorador Module
import { CategoriesService } from './categories.service'; //Importa servicio
import { CategoriesController } from './categories.controller'; //Importa controlador
import { TypeOrmModule } from '@nestjs/typeorm'; //Importa TypeOrModule
import { Category } from './category.entity';  // Importa la entidad de categorías
import { AuthModule } from '../auth/auth.module'; // Asegúrate de importar el AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),  // Registra la entidad Category para que el repositorio esté disponible en este módulo
    AuthModule, // Aquí importamos el AuthModule para que JwtService esté disponible
  ],
  controllers: [CategoriesController], // Declara el controlador de categorías para manejar las solicitudes HTTP
  providers: [CategoriesService], // Declara el servicio de categorías para manejar la lógica de negocio
})
export class CategoriesModule {}
