//proyecto_nest/src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'; //Importamos decoradores
import { Order } from '../orders/order.entity'; // Importa la entidad de pedidos

@Entity() // Declara que esta clase es una entidad (correspondiente a una tabla en la base de datos)
export class User {
  @PrimaryGeneratedColumn() // Indica que esta propiedad es la clave primaria (ID) y será autoincrementable
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // Declara que esta propiedad se corresponde con una columna de la tabla
  email: string;  // Correo electrónico único

  @Column( { type: 'varchar', length: 255 } ) // Declara una columna más en la tabla
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;  // Contraseña del usuario

  @Column({ type: 'varchar', default: 'user' })
  role: string;  // Rol del usuario, por defecto 'user'
  
  // Relación con pedidos
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]; // Agrega esta propiedad
}
