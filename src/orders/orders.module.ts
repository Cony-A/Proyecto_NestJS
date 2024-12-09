//proyecto_nest/src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
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
