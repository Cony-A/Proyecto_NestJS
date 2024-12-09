//proyecto_nest/src/orders/order-product.entity.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm'; // Importa los decoradores y tipos necesarios de TypeORM
import { Order } from './order.entity'; // Importa la entidad Order para establecer una relación con los pedidos
import { Product } from '../products/product.entity'; // Importa la entidad Product para establecer una relación con los productos

// Define la entidad intermedia para la relación muchos a muchos entre pedidos y productos
@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()  // Define una columna de clave primaria autogenerada para identificar cada relación
  id: number;

  // Relación muchos a uno con la entidad Order
  // Un pedido puede tener múltiples productos asociados
  @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: 'CASCADE' })  // Relación con el pedido
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // Relación muchos a uno con la entidad Product
  // Un producto puede estar asociado a múltiples pedidos
  @ManyToOne(() => Product, (product) => product.id)  // Relación con el producto
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('int')
  quantity: number;  // Cantidad de este producto en el pedido
}
