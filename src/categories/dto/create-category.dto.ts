// src/categories/dto/create-category.dto.ts
import { IsString, IsOptional } from 'class-validator'; // Importa validadores de class-validator

/**
 * @class CreateOrderDto
 * @description Define los datos necesarios para crear una nueva categoria.
 */

export class CreateCategoryDto {
  
  //Nombre de la categoría.
  
  @IsString()
  name: string;

  // Descripción de la categoría.
  
  @IsString()
  @IsOptional()  // El campo description es opcional
  description: string;
}