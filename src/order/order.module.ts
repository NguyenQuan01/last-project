import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderDetailRepository } from './orderDetail.repository';
import { VoucherRepository } from 'src/voucher/voucher.repositoty';
import { ItemflashsaleRepository } from 'src/itemflashsale/itemflashsale.repository';
import { ItemRepository } from 'src/items/item.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([OrderRepository, OrderDetailRepository, VoucherRepository, ItemflashsaleRepository, ItemRepository]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
