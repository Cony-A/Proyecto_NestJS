//proyecto_nest/src/products/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'; //Importa decoradores
import { Category } from '../categories/category.entity';  // Relacionamos con la categoría

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number; //id del producto

  @Column()
  name: string; //nombre del producto

  @Column('decimal')
  price: number; //precio del producto
  
  @Column('int')
  stock: number;
  
  // Relación con la categoría (muchos a uno)
  @ManyToOne(() => Category, (category) => category.products) // Relacionamos con la categoría
  @JoinColumn({ name: 'category_id' }) // Indicamos que la columna que contiene la relación se llama 
  category: Category;

}
