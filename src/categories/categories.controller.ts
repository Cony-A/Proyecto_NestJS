// src/categories/categories.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';  // Importa el DTO para crear categorías
import { Roles } from '../auth/roles.decorator'; // Importa el decorador Roles
import { RolesGuard } from '../auth/roles.guard'; // Importa los Roles Guards
import { UseGuards } from '@nestjs/common';  

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * @route POST /categories
   * @description Crea una nueva categoría.
   * @param createCategoryDto - DTO que contiene los datos para crear una categoría.
   * @returns La categoría creada.
   */
  @Post()
  @Roles('admin')  // Solo los administradores pueden crear categorías
  @UseGuards(RolesGuard)  // Aplica el guardia de roles para proteger esta ruta
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  /**
   * @route GET /categories
   * @description Obtiene todas las categorías.
   * @returns Un arreglo con todas las categorías.
   */
  @Get()
  async findAll() {
    return this.categoriesService.findAll(); // Llama al servicio para obtener todas las categorías
  }

  /**
   * @route GET /categories/:id
   * @description Obtiene una categoría por su ID.
   * @param id - ID de la categoría.
   * @returns La categoría encontrada.
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id); // Llama al servicio para obtener la categoría por ID
  }

  /**
   * @route PUT /categories/:id
   * @description Actualiza los datos de una categoría existente.
   * @param id - ID de la categoría a actualizar.
   * @param createCategoryDto - DTO que contiene los datos actualizados de la categoría.
   * @returns La categoría actualizada.
   */
  @Put(':id')
  @Roles('admin')  // Solo los administradores pueden actualizar categorías
  @UseGuards(RolesGuard)  // Aplica el guardia de roles para proteger esta ruta
  async update(@Param('id') id: number, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.updateCategory(id, createCategoryDto); // Llama al servicio para actualizar la categoría
  }

  /**
   * @route DELETE /categories/:id
   * @description Elimina una categoría.
   * @param id - ID de la categoría a eliminar.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @Roles('admin')  // Solo los administradores pueden eliminar categorías
  @UseGuards(RolesGuard)  // Aplica el guardia de roles para proteger esta ruta
  async remove(@Param('id') id: number) {
    return this.categoriesService.removeCategory(id); // Llama al servicio para eliminar la categoría
  }
}

