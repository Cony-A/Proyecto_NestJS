//proyecto_nest/src/products/products.service.ts

import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable para declarar que esta clase es un servicio que puede ser inyectado en otros componentes
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository para inyectar los repositorios de TypeORM en el servicio
import { Repository } from 'typeorm'; // Importa la clase Repository de TypeORM para interactuar con la base de datos
import { Product } from './product.entity'; // Importa la entidad Product, que representa la tabla de productos en la base de datos
import { Category } from '../categories/category.entity'; // Importa la entidad Category, que representa la tabla de categorías en la base de datos

@Injectable()
export class ProductsService {
  constructor(
    // Inyecta el repositorio de productos para realizar operaciones con la tabla 'products'
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    // Inyecta el repositorio de categorías para interactuar con la tabla 'categories'
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Crea un nuevo producto
  async createProduct(productData: any): Promise<Product> {
     // Extrae los datos necesarios del objeto 'productData'
    const { name, price, stock, category_id } = productData;
    
    // Busca la categoría asociada al 'category_id
    const category = await this.categoriesRepository.findOne({ where: { id: category_id } });

    // Si no se encuentra la categoría, lanza un error
    if (!category) {
      throw new Error(`Category with id ${category_id} not found`);
    }

    // Crea una nueva instancia de producto con los datos proporcionados
    const newProduct = this.productsRepository.create({
      name,
      price,
      stock,
      category,
    });

    // Guarda el nuevo producto en la base de datos y lo devuelve
    return this.productsRepository.save(newProduct);
  }

  // Obtiene todos los productos, incluyendo sus categorías asociadas
  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

   // Obtiene un producto por su ID, incluyendo su categoría asociada
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id }, relations: ['category'] });

    // Si no se encuentra el producto, lanza un error
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  }

  // Actualiza un producto existente
  async updateProduct(id: number, productData: any): Promise<Product> {
    
    // Extrae los datos necesarios del objeto 'productData'
    const { name, price, stock, category_id } = productData;
    
    // Actualiza el producto con los nuevos datos (excepto la categoría)
    await this.productsRepository.update(id, { name, price, stock });
    
    // Busca el producto actualizado con su categoría
    const updatedProduct = await this.productsRepository.findOne({ where: { id }, relations: ['category'] });

    // Si el producto no se encuentra, lanza un error
    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Busca la nueva categoría asociada al 'category_id'
    const category = await this.categoriesRepository.findOne({ where: { id: category_id } });
    
    // Si la categoría no se encuentra, lanza un error
    if (!category) {
      throw new Error(`Category with id ${category_id} not found`);
    }

    // Asigna la nueva categoría al producto actualizado
    updatedProduct.category = category;

    // Guarda el producto actualizado en la base de datos y lo devuelve
    return this.productsRepository.save(updatedProduct);
  }

  // Elimina un producto por su ID
  async removeProduct(id: number): Promise<void> {
    
    // Busca el producto por su ID
    const product = await this.productsRepository.findOne({ where: { id } });

    // Si no se encuentra el producto, lanza un error
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Elimina el producto de la base de datos
    await this.productsRepository.delete(id);
  }
}
