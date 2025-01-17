// // orders.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Orders } from './entities/orders.entity';
// import { OrderDetails } from './entities/orderDetails.entity';
// import { Products } from 'src/products/entities/products.entity'; 
// import { Users } from '../users/entities/users.entity';

// @Injectable()
// export class OrdersService {
//   constructor(
//     @InjectRepository(Orders)
//     private readonly ordersRepository: Repository<Orders>,
//     @InjectRepository(OrderDetails)
//     private readonly orderDetailsRepository: Repository<OrderDetails>,
//     @InjectRepository(Products)
//     private readonly productsRepository: Repository<Products>,
//     @InjectRepository(Users)
//     private readonly usersRepository: Repository<Users>,
//   ) {}

//   async addOrder(userId: string, products: { id: string }[]) {
//     // Buscar usuario
//     const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['orders'] });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     // Crear orden
//     const order = new Orders();
//     order.date = new Date();
//     order.user = user;
//     const savedOrder = await this.ordersRepository.save(order);

//     // // Buscar productos y calcular total
//     // let totalPrice = 0;
//     // const productsInOrder = [];
//     // for (const productRequest of products) {
//     //   const product = await this.productsRepository.findOne({ where: { id: productRequest.id, stock: true } });

//     //   if (!product || product.stock <= 0) {
//     //     throw new NotFoundException(`Product with ID ${productRequest.id} is not available or out of stock`);
//     //   }

//     //   product.stock -= 1; // Reducir stock
//     //   await this.productsRepository.save(product);

//     //   productsInOrder.push(product);
//     //   totalPrice += Number(product.price);
//     // }

//     // Crear detalle de orden
//     const orderDetails = new OrderDetails();
//     orderDetails.price = totalPrice;
//     orderDetails.products = productsInOrder;
//     orderDetails.order = savedOrder;
//     const savedOrderDetails = await this.orderDetailsRepository.save(orderDetails);

//     savedOrder.orderDetails = savedOrderDetails;
//     await this.ordersRepository.save(savedOrder);

//     return {
//       orderId: savedOrder.id,
//       total: totalPrice,
//       detailsId: savedOrderDetails.id,
//     };
//   }

//   async getOrder(orderId: string) {
//     const order = await this.ordersRepository.findOne({
//       where: { id: orderId },
//       relations: ['orderDetails', 'orderDetails.products', 'user'],
//     });

//     if (!order) {
//       throw new NotFoundException('Order not found');
//     }

//     return {
//       order: {
//         id: order.id,
//         date: order.date,
//         user: { id: order.user.id, name: order.user.name },
//       },
//       details: {
//         id: order.orderDetails.id,
//         price: order.orderDetails.price,
//         products: order.orderDetails.products,
//       },
//     };
//   }
// }
