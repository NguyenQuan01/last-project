import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entity/user..entity';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetAddressFilterDto } from './dto/get-address-filter.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
  ) { }
  async create(createAddressDto: CreateAddressDto, user: User): Promise<Address> {
    const addressShip = this.addressRepository.create({
      ...createAddressDto,
      user,
    })
    await this.addressRepository.save(addressShip)
    return addressShip
  }

  async findAll(filterDto: GetAddressFilterDto, user: User): Promise<Address[]> {
    const { search } = filterDto
    const query = this.addressRepository.createQueryBuilder('address')
    query.where({ user });

    if (search) {
      query.andWhere('LOWER(address.name) LIKE LOWER(:search) OR LOWER(address.phone) LIKE LOWER(:search) OR LOWER(address.address) LIKE LOWER(:search)', { search: `%${search}%` })
    }

    const address = await query.getMany()
    return address
  }

  findOne(id: string, user: User): Promise<Address> {
    const found = this.addressRepository.findOne({ where: { id, user } })
    if (!found) {
      throw new BadRequestException(`Address id: ${id} not found`);
    }
    return found
  }

  async update(id: string, updateAddressDto: UpdateAddressDto, user: User): Promise<Address> {
    const { name, phone, address } = updateAddressDto
    const addressShip = await this.findOne(id, user)

    if (name) {
      addressShip.name = name;
    }
    if (phone) {
      addressShip.phone = phone;
    }
    if (address) {
      addressShip.address = address;
    }

    await this.addressRepository.save(addressShip);
    return addressShip
  }

  async remove(id: string, user: User): Promise<void> {
    const result = await this.addressRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
  }
}
