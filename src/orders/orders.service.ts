//proyecto_nest/src/orders/orders.service.ts

import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable para declarar que esta clase es un servicio que puede ser inyectado en otros componentes
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository para inyectar los repositorios de TypeORM en el servicio
import { Repository } from 'typeorm';  // Importa la clase Repository de TypeORM para interactuar con la base de datos
import { Order } from './order.entity'; //Importa la entidad order
import { Product } from '../products/product.entity'; //Importa la entidad product
import { User } from '../users/user.entity'; //Importa la entidad user
import { OrderProduct } from './order-product.entity'; // Nueva entidad para productos en pedidos
import { In } from 'typeorm'; 

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>, // Repositorio para la entidad de pedidos

    @InjectRepository(Product)
    private productsRepository: Repository<Product>, // Repositorio para la entidad de productos

    @InjectRepository(User)
    private usersRepository: Repository<User>, // Repositorio para la entidad de usuarios

    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>, // Inyectamos la nueva entidad OrderProduct
  ) {}

  // Crear un nuevo pedido
  async createOrder(userId: number, productIds: number[], quantities: number[]): Promise<Order> {
    // Buscar el usuario por su ID
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Buscar los productos por sus IDs
    const products = await this.productsRepository.findBy({
      id: In(productIds),
    });
    if (products.length !== productIds.length) {
      throw new Error('Some products not found');
    }

    // Inicializar el precio total del pedido
    let totalPrice = 0;

    // Crear el pedido con el usuario, precio total inicial y estado 'pending'
    const order = this.ordersRepository.create({
      user,
      totalPrice: 0,
      status: 'pending',
      quantity: quantities.reduce((acc, qty) => acc + qty, 0),
    });

    // Guardar el pedido en la base de datos
    const savedOrder = await this.ordersRepository.save(order);

    // Crear las relaciones entre el pedido y los productos
    const orderProducts = [];
    for (let i = 0; i < productIds.length; i++) {
      const product = products.find((p) => p.id === productIds[i]);
      const quantity = quantities[i];

      // Validar si hay suficiente stock para el producto
      if (!product || product.stock < quantity) {
        throw new Error(`Not enough stock for product: ${product?.name || 'unknown'}`);
      }

      // Calcular el precio total del pedido
      totalPrice += product.price * quantity;
      product.stock -= quantity;

      // Crear y guardar la relación OrderProduct
      const orderProduct = this.orderProductRepository.create({
        order: savedOrder,
        product,
        quantity,
      });
      orderProducts.push(orderProduct);
    }

    // Guardar las relaciones entre el pedido y los productos
    await this.orderProductRepository.save(orderProducts);

    // Actualizar el precio total en el pedido y guardarlo
    savedOrder.totalPrice = totalPrice;
    await this.ordersRepository.save(savedOrder);

    // Actualizar el stock de los productos
    await this.productsRepository.save(products);

    return savedOrder;
  }

  // Obtener todos los pedidos
  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'orderProducts', 'orderProducts.product'] });
  }

  // Obtener un pedido por ID
  async getOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'orderProducts', 'orderProducts.product'],
    });
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return order;
  }

  // Actualizar el estado de un pedido
  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    
    //Tira error si no encuentra ID del pedido  
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    order.status = status; // Cambiar el estado
    return this.ordersRepository.save(order);
  }

  // Eliminar un pedido
  async removeOrder(id: number): Promise<void> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product'], // Asegúrate de cargar las relaciones necesarias
    });

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    // Recuperar los productos del pedido antes de eliminarlo para restaurar el stock
    const products = order.orderProducts.map((op) => op.product);

    // Aumentar el stock de los productos al eliminar el pedido
    for (const orderProduct of order.orderProducts) {
      const product = orderProduct.product;
      product.stock += orderProduct.quantity;
    }

    // Eliminar las relaciones OrderProduct
    await this.orderProductRepository.delete({ order: { id } });

    // Eliminar el pedido
    await this.ordersRepository.delete(id);

    // Actualizar el stock de los productos
    await this.productsRepository.save(products);
  }
}
