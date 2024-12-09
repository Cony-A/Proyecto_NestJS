//proyecto_nest/src/orders/order.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'; //Importa decoradores
import { User } from '../users/user.entity'; //Importa la entidad order
import { OrderProduct } from './order-product.entity';  // Relación con la nueva entidad OrderProduct

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number; // ID del pedido

  @ManyToOne(() => User, (user) => user.orders)  // Relación con el usuario (cliente)
  @JoinColumn({ name: 'user_id' })
  user: User;  // El cliente que hace el pedido

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })  // Relación con los productos a través de OrderProduct
  orderProducts: OrderProduct[];  // Lista de productos en el pedido

  @Column('decimal')
  totalPrice: number;  // El precio total del pedido

  @Column({ default: 'pending' })
  status: string;  // Estado del pedido (por ejemplo, 'pending', 'shipped', 'delivered')

  @Column()
  quantity: number;  // La cantidad total de productos en el pedido
}
