import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { TypeStatus } from './status/type-status.enum';
import { VoucherRepository } from './voucher.repositoty';

@Injectable()
export class VoucherService {
  constructor(
    private voucherRepository: VoucherRepository,
  ) { }
  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    const { discount } = createVoucherDto
    if ( discount >= 0 && discount < 100 ) {
      const addressShip = this.voucherRepository.create({
        ...createVoucherDto,
      })
      await this.voucherRepository.save(addressShip)
      return addressShip

    } else {
      throw new BadRequestException('voucher discount mustbe over 0% and less than 100%');
    }
  }

  findAll(): Promise<Voucher[]> {
    return this.voucherRepository.find();
  }

  findOne(id: string): Promise<Voucher> {
    const found = this.voucherRepository.findOne({ id })
    if (!found) {
      throw new BadRequestException(`voucher id: ${id} not found`);
    }
    return found
  }

  async update(id: string, updateVoucherDto: UpdateVoucherDto): Promise<Voucher> {
    const { discount } = updateVoucherDto
    const updatedVoucher = await this.voucherRepository.findOne(id);
    if (discount >= 0 && discount < 100) {
      if (updatedVoucher) {
        await this.voucherRepository.update(id, updateVoucherDto);
        return updatedVoucher;
      }
  
      throw new HttpException('voucher not found', HttpStatus.NOT_FOUND);
      
    } else {
      throw new BadRequestException('voucher discount mustbe over 0% and less than 100%');
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.voucherRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
  }
}
