import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderDetailRepository } from './orderDetail.repository';
import { ItemRepository } from 'src/items/item.repository';
import { AddressRepository } from 'src/address/address.repository';
import { FlashsaleRepository } from 'src/flashsale/flashsale.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([OrderRepository, OrderDetailRepository, ItemRepository, AddressRepository, FlashsaleRepository]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
