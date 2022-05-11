import { Module } from '@nestjs/common';
import { ItemflashsaleService } from './itemflashsale.service';
import { ItemflashsaleController } from './itemflashsale.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemflashsaleRepository } from './itemflashsale.repository';
import { ItemsService } from 'src/items/items.service';
import { ItemRepository } from 'src/items/item.repository';
import { FlashsaleRepository } from 'src/flashsale/flashsale.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ItemflashsaleRepository, ItemRepository, FlashsaleRepository]),
  ],
  controllers: [ItemflashsaleController],
  providers: [ItemflashsaleService]
})
export class ItemflashsaleModule {}
