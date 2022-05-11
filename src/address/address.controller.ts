import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entity/user..entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetAddressFilterDto } from './dto/get-address-filter.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Controller('address')
@UseGuards(AuthGuard())
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressService.create(createAddressDto, user);
  }

  @Get()
  findAll(
    @Query() filterDto: GetAddressFilterDto,
    @GetUser() user: User,
  ): Promise<Address[]> {
    return this.addressService.findAll(filterDto, user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.addressService.remove(id, user);
  }
}
