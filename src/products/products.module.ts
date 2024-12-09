//proyecto_nest/src/products/products.module.ts

import { Module } from '@nestjs/common';  // Importa el decorador 'Module' de NestJS, usado para definir un módulo.
import { ProductsController } from './products.controller'; // Importa el controlador de productos, maneja las rutas.
import { ProductsService } from './products.service'; // Importa el servicio de productos, maneja la lógica de negocio.
import { TypeOrmModule } from '@nestjs/typeorm';// Importa TypeOrmModule, utilizado para interactuar con la base de datos.
import { Product } from './product.entity';  // Importa la entidad Product, que representa la tabla de productos en la base de datos.
import { Category } from '../categories/category.entity'; // Importa la entidad Category, utilizada para asociar productos con categorías.
import { AuthModule } from '../auth/auth.module'; // Importa el módulo de autenticación, necesario para protección de rutas.
import { JwtService } from '@nestjs/jwt';  // Importa JwtService para manejar la creación y validación de tokens JWT.

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), // Registra las entidades de Product y Category para su uso en TypeORM.
  AuthModule, // Importa AuthModule para manejar la autenticación de usuarios.
], 
  controllers: [ProductsController],  // Registra el controlador de productos, que manejará las rutas.
  providers: [ProductsService, JwtService],  // Registra el servicio de productos y el servicio JWT.
})
export class ProductsModule {}
