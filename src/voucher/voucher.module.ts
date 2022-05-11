import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherRepository } from './voucher.repositoty';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([VoucherRepository]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService]
})
export class VoucherModule {}
