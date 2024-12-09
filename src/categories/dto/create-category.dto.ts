// src/categories/dto/create-category.dto.ts
import { IsString, IsOptional } from 'class-validator'; // Importa validadores de class-validator

export class CreateCategoryDto {
  
  //Nombre de la categoría.
  
  @IsString()
  name: string;

  // Descripción de la categoría.
  
  @IsString()
  @IsOptional()  // El campo description es opcional
  description: string;
}