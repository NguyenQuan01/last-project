import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entity/user..entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto, 
    @Body() createOrderDetailDto: CreateOrderDetailDto,
    @GetUser() user: User,
  ){
    return this.orderService.create(createOrderDto, createOrderDetailDto, user);
  }

  @Get()
  findAll(
    @GetUser() user: User,
  ) {
    return this.orderService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.orderService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @GetUser() user: User,
  ) {
    return this.orderService.update(id, updateOrderDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.orderService.remove(id, user);
  }
}
