//proyecto_nest/src/categories/categories.service.ts
import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable para declarar que esta clase es un servicio que puede ser inyectado en otros componentes
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository para inyectar los repositorios de TypeORM en el servicio
import { Repository } from 'typeorm';  // Importa la clase Repository de TypeORM para interactuar con la base de datos
import { Category } from './category.entity';  // Importa la entidad Category
import { CreateCategoryDto } from './dto/create-category.dto';  // Importa el DTO

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,  // Inyecta el repositorio de Category
  ) {}

  /**
   * @description Crea una nueva categoría utilizando los datos del DTO.
   * @param createCategoryDto - DTO que contiene los datos para la creación de una nueva categoría.
   * @returns La categoría creada.
   */
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto); // Crea la entidad Category a partir del DTO
    return this.categoriesRepository.save(category); // Guarda la categoría en la base de datos
  }

  /**
   * @description Obtiene todas las categorías de la base de datos.
   * @returns Un arreglo con todas las categorías.
   */
  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find(); // Retorna todas las categorías
  }

  /**
   * @description Obtiene una categoría por su ID.
   * @param id - ID de la categoría.
   * @returns La categoría encontrada.
   */
  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });

    if (!category) {
      throw new Error(`Category with id ${id} not found`); // Si no se encuentra, lanza un error
    }

    return category; // Retorna la categoría encontrada
  }

  /**
   * @description Actualiza los datos de una categoría existente.
   * @param id - ID de la categoría a actualizar.
   * @param createCategoryDto - DTO con los datos actualizados.
   * @returns La categoría actualizada.
   */
  async updateCategory(id: number, createCategoryDto: CreateCategoryDto): Promise<Category> {
    await this.categoriesRepository.update(id, createCategoryDto); // Actualiza los datos de la categoría
    const updatedCategory = await this.categoriesRepository.findOne({ where: { id } });

    if (!updatedCategory) {
      throw new Error(`Category with id ${id} not found`); // Si no se encuentra la categoría, lanza un error
    }

    return updatedCategory; // Retorna la categoría actualizada
  }

  /**
   * @description Elimina una categoría de la base de datos.
   * @param id - ID de la categoría a eliminar.
   * @returns Mensaje de confirmación.
   */
  async removeCategory(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({ where: { id } });

    if (!category) {
      throw new Error(`Category with id ${id} not found`); // Si no se encuentra la categoría, lanza un error
    }

    await this.categoriesRepository.delete(id); // Elimina la categoría
  }
}
