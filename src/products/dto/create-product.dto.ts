// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';  // Importa las validaciones de class-validator

export class CreateProductDto {
  @IsString()  // Asegura que el nombre sea una cadena de texto
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @IsNumber()  // Asegura que el precio sea un número
  @IsPositive({ message: 'El precio debe ser un número positivo' }) // Valida que el precio sea positivo
  price: number;

  @IsNumber()  // Asegura que el stock sea un número
  @IsPositive({ message: 'El stock debe ser un número positivo' }) // Valida que el stock sea positivo
  stock: number;

  @IsNumber()  // Asegura que el id de categoría sea un número
  @IsNotEmpty({ message: 'La categoría es obligatoria' }) // Asegura que la categoría no esté vacía
  category_id: number;
}