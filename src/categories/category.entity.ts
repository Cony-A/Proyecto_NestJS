//proyecto_nest/src/categories/category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,  OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';  // Relacionamos con los productos

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number; //ID de categoria

  @Column({ unique: true })
  name: string; //nombre de categoria

  @Column({ nullable: true })
  description: string; //descripción de categoría
  
  // Relación con productos (uno a muchos)
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
