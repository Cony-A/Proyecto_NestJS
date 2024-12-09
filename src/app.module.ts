//proyecto_nest/src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'; // Importa el decorador 'Module' y 'NestModule' que son necesarios para definir un módulo en NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importamos TypeOrmModule
import { AppController } from './app.controller'; // Controlador principal de la aplicación
import { AppService } from './app.service'; // Servicio principal de la aplicación

import { Product } from './products/product.entity';  // Importa la entidad Product
import { User } from './users/user.entity';  // Importa la entidad User
import { Order } from './orders/order.entity';  // Importa la entidad Order
import { Category } from './categories/category.entity';  // Importa la entidad Category
import { OrderProduct } from './orders/order-product.entity';  // Asegúrate de importar OrderProduct

// Importa los módulos creados
import { UsersModule } from './users/users.module'; // Módulo para la gestión de usuarios
import { ProductsModule } from './products/products.module'; // Módulo para la gestión de productos
import { CategoriesModule } from './categories/categories.module'; // Módulo para la gestión de categorías
import { OrdersModule } from './orders/orders.module'; // Módulo para la gestión de pedidos
import { DatabaseService } from './database/database.service';  // Servicio para la conexión y operaciones con la base de datos
import { DatabaseController } from './database/database.controller'; // Controlador para la interacción con la base de datos
import { AuthModule } from './auth/auth.module'; // Módulo de autenticación
import { AuthMiddleware } from './auth/auth.middleware';  // // Middleware para gestionar la autenticación

// Aquí agregamos el AppModule con la configuración de la base de datos

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // El tipo de base de datos, en este caso MySQL
      host: 'localhost', // Dirección del host de la base de datos 
      port: 3306, // El puerto por defecto de MySQL
      username: 'root', // Nombre de usuario de MySQL
      password: '', // Tu contraseña de MySQL
      database: 'mi_base_de_datos', // Nombre de la base de datos
      entities: [Product, User, Order, Category, OrderProduct], // Entidades que se usarán en TypeORM, generarán las tablas en la base de datos
      synchronize: true, // Esto crea tablas automáticamente (útil para desarrollo, pero no recomendado en producción). Si esta en true, sincroniza las entidades con la base de datos automáticamente
    }),
    UsersModule, // Registra el módulo de Users
    ProductsModule, // Registra el módulo de Products
    CategoriesModule, // Registra el módulo de Categories
    OrdersModule, // Registra el módulo de Pedidos
    AuthModule, // Registra el módulo de autenticación
  ],

  
  controllers: [AppController, DatabaseController], // Controladores principales para la aplicación
  providers: [AppService, DatabaseService], // Servicios de la aplicación
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aquí aplicas el middleware a las rutas que quieres proteger
    consumer
      .apply(AuthMiddleware)  // Aplica el middleware para autenticación
      .forRoutes('users/profile', 'users/admin', 'products','categories', 'orders');  // Rutas que necesitan protección
  }
}
