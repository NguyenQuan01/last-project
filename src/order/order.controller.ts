import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entity/user..entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/custom/role.guard';
import { Roles } from 'src/custom/role.decorato';
import { RoleStatus } from 'src/user/status/role-status.enum';
import { GetTasksFilterDto } from './dto/get-order-filter.dto';

@Controller('order')
@UseGuards(AuthGuard(), RoleGuard)
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
    @GetUser() user: User, filterDto: GetTasksFilterDto
  ) {
    return this.orderService.findAll(user, filterDto);
  }

  @Get(':id')
  @Roles(RoleStatus.ADMIN, RoleStatus.SUPPERADMIN)
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.orderService.findOne(id, user);
  }

  @Patch(':id')
  @Roles(RoleStatus.ADMIN, RoleStatus.SUPPERADMIN)
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @GetUser() user: User,
  ) {
    return this.orderService.update(id, updateOrderDto, user);
  }

  @Delete(':id')
  @Roles(RoleStatus.ADMIN, RoleStatus.SUPPERADMIN)
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.orderService.remove(id, user);
  }
}
