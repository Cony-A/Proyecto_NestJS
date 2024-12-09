// Ruta: src/orders/dto/create-order.dto.ts
import { IsArray, IsNumber, IsNotEmpty } from 'class-validator';

/**
 * @class CreateOrderDto
 * @description Define los datos necesarios para crear un nuevo pedido.
 */
export class CreateOrderDto {
  @IsNumber()  // Asegura que el userId sea un número
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  userId: number;

  @IsArray()  // Asegura que productIds sea un arreglo
  @IsNotEmpty({ message: 'Los IDs de los productos son obligatorios' })
  productIds: number[];

  @IsArray()  // Asegura que quantities sea un arreglo
  @IsNotEmpty({ message: 'Las cantidades son obligatorias' })
  quantities: number[];
}