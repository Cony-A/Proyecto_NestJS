//proyecto_nest/src/orders/orders.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderDto } from './dto/create-order.dto';  // Importamos el DTO de órdenes

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * @route POST /orders
   * @description Crea un nuevo pedido.
   * @param createOrderDto - DTO que contiene los datos para crear un nuevo pedido.
   * @returns El pedido creado.
   */
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(
      createOrderDto.userId,  // Extraemos el userId del DTO
      createOrderDto.productIds,  // Extraemos los productIds del DTO
      createOrderDto.quantities,  // Extraemos las cantidades del DTO
    );
  }

  /**
   * @route GET /orders
   * @description Obtiene todos los pedidos (solo para administradores).
   * @returns Un arreglo con todos los pedidos.
   */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')  // Solo los administradores pueden acceder a esta ruta
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  /**
   * @route GET /orders/:id
   * @description Obtiene un pedido por su ID (solo para administradores).
   * @param id - ID del pedido.
   * @returns El pedido encontrado.
   */
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')  // Solo los administradores pueden acceder a esta ruta
  async getOrderById(@Param('id') id: number) {
    return this.ordersService.getOrderById(id);
  }

  /**
   * @route PUT /orders/:id
   * @description Actualiza el estado de un pedido (solo para administradores).
   * @param id - ID del pedido a actualizar.
   * @param status - El nuevo estado del pedido.
   * @returns El pedido actualizado.
   */
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')  // Solo los administradores pueden acceder a esta ruta
  async updateOrderStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(id, status);
  }

  /**
   * @route DELETE /orders/:id
   * @description Elimina un pedido (solo para administradores).
   * @param id - ID del pedido a eliminar.
   * @returns Mensaje de confirmación de eliminación.
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')  // Solo los administradores pueden acceder a esta ruta
  async removeOrder(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }
}


/*
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Crear un nuevo pedido
  @Post()
  async createOrder(
    @Body('userId') userId: number,
    @Body('productIds') productIds: number[],
    @Body('quantities') quantities: number[],
  ) {
    return this.ordersService.createOrder(userId, productIds, quantities);
  }

  // Obtener todos los pedidos (solo para administradores)
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  // Obtener un pedido por ID (solo para administradores)
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getOrderById(@Param('id') id: number) {
    return this.ordersService.getOrderById(id);
  }

  // Actualizar el estado de un pedido (solo para administradores)
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateOrderStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(id, status);
  }

  // Eliminar un pedido (solo para administradores)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async removeOrder(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }
}


*/