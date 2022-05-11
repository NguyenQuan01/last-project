import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll():Promise<Voucher[]> {
    return this.voucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Voucher> {
    return this.voucherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto): Promise<Voucher> {
    return this.voucherService.update(id, updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.voucherService.remove(id);
  }
}
