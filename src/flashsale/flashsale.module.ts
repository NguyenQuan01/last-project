import { Module } from '@nestjs/common';
import { FlashsaleService } from './flashsale.service';
import { FlashsaleController } from './flashsale.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashsaleRepository } from './flashsale.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([FlashsaleRepository]),
  ],
  controllers: [FlashsaleController],
  providers: [FlashsaleService]
})
export class FlashsaleModule { }
