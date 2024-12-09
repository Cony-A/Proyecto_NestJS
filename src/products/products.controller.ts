//proyecto_nest/src/products/products.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from '../auth/roles.decorator'; // Importa el decorador Roles, utilizado para restringir el acceso a ciertas rutas según el rol.
import { RolesGuard } from '../auth/roles.guard'; // Importa el guardia RolesGuard, que protege las rutas según los roles del usuario.
import { UseGuards } from '@nestjs/common'; // Importa 'UseGuards' para aplicar el guardia en las rutas.
import { CreateProductDto } from './dto/create-product.dto'; // Importa el DTO para crear un producto

@Controller('products') // Define la ruta base para este controlador para las peticiones de productos.
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * @route POST /products
   * @description Crea un nuevo producto.
   * @param createProductDto - DTO que contiene los datos del nuevo producto.
   * @returns El producto creado.
   */
  @Post() // Solo los admin pueden ingresar a esta ruta y crear productos
  @Roles('admin') 
  @UseGuards(RolesGuard) 
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  /**
   * @route GET /products
   * @description Obtiene todos los productos.
   * @returns Un arreglo con todos los productos.
   */
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  /**
   * @route GET /products/:id
   * @description Obtiene un producto específico por ID.
   * @param id - ID del producto.
   * @returns El producto encontrado.
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  /**
   * @route PUT /products/:id
   * @description Actualiza un producto.
   * @param id - ID del producto.
   * @param createProductDto - DTO que contiene los datos actualizados del producto.
   * @returns El producto actualizado.
   */
  @Put(':id')
  @Roles('admin') // Solo los admin pueden actualizar productos
  @UseGuards(RolesGuard)
  async update(@Param('id') id: number, @Body() createProductDto: CreateProductDto) {
    return this.productsService.updateProduct(id, createProductDto);
  }

  /**
   * @route DELETE /products/:id
   * @description Elimina un producto.
   * @param id - ID del producto.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @Roles('admin') // Solo los admin pueden eliminar productos
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }
}
