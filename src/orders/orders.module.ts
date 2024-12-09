//proyecto_nest/src/orders/orders.module.ts
import { Module } from '@nestjs/common'; //Importar modulo
import { OrdersService } from './orders.service'; //Importar servicio
import { OrdersController } from './orders.controller'; //Importar controlador
import { TypeOrmModule } from '@nestjs/typeorm'; //Importar TypeOrmModule
import { Order } from './order.entity'; //Importar order
import { Product } from '../products/product.entity'; //Importar product
import { User } from '../users/user.entity'; //Importar user
import { AuthModule } from '../auth/auth.module'; // Importa el AuthModule
import { OrderProduct } from './order-product.entity'; // Asegúrate de importar OrderProduct

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, User, OrderProduct]),
    AuthModule, // Asegúrate de incluir el AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
