// import { Controller, Post, Get, Body, Param } from '@nestjs/common';
// import { OrdersService } from './orders.service';

// @Controller('orders')
// export class OrdersController {
//   constructor(private readonly ordersService: OrdersService) {}

//   @Post()
//   async addOrder(@Body() body: { userId: string; products: { id: string }[] }) {
//     return this.ordersService.addOrder(body.userId, body.products);
//   }

//   @Get(':id')
//   async getOrder(@Param('id') id: string) {
//     return this.ordersService.getOrder(id);
//   }
// }
