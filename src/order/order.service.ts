import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from 'src/address/address.repository';
import { ItemRepository } from 'src/items/item.repository';
import { User } from 'src/user/entity/user..entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { OrderDetailRepository } from './orderDetail.repository';
import { createQueryBuilder } from 'typeorm';
import { Itemflashsale } from 'src/itemflashsale/entities/itemflashsale.entity';
import { Voucher } from 'src/voucher/entities/voucher.entity';
import { OrderStatus } from './status/order-status.enum';
import { GetTasksFilterDto } from './dto/get-order-filter.dto';


@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private orderDetailRepository: OrderDetailRepository,
    private itemRepository: ItemRepository,
    private addressRepository: AddressRepository,
  ) { }
  async create(createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto, user: User) {
    const { voucherId, addressId } = createOrderDto
    const { quantity, itemId, itemflashsaleId } = createOrderDetailDto

    const item = await this.itemRepository.findOne(itemId)
    const address = await this.addressRepository.findOne(addressId)

    const timeNow = new Date()

    // const itemflashsale = await
    //   createQueryBuilder('itemflashsale', 'itemFlashSale')flashsale
    //     .innerJoinAndMapOne('itemFlashSale.flashSale', 'flashsale', 'flashSale', `"itemFlashSale"."flashsaleId" = "flashSale"."id"`)
    //     .where('itemFlashSale.id = :id', { id: itemId })
    //     .andWhere('flashSale.startsale < :timeNow', { timeNow })
    //     .andWhere('flashSale.endsale > :timeNow', { timeNow })
    //     .orderBy('itemFlashSale.discount', 'DESC')
    //     .getRawOne()

    const itemflashsale = await createQueryBuilder(Itemflashsale, 'itemFlashSale')
      .innerJoinAndSelect('itemFlashSale.flashsale', 'flashsale')
      .where('itemFlashSale.id = :itemflashsaleId', { itemflashsaleId })
      .andWhere('flashsale.startsale < :timeNow', { timeNow })
      .andWhere('flashsale.endsale > :timeNow', { timeNow })
      .getOne()

    const voucher = await createQueryBuilder(Voucher, 'voucher')
      .where('voucher.id = :voucherId', {voucherId})
      .andWhere('voucher.startTime < :timeNow', { timeNow })
      .andWhere('voucher.endTime > :timeNow', { timeNow })
      .getOne()


    let priceship = 0
    let itemPriceVoucher = 0
    let priceShipVoucher = 0
    let itemPriceFlashSale = 0

    const itemPrice = quantity * item.price


    if (itemflashsale) itemPriceFlashSale = itemflashsale.discount

    if (item.weight <= 1) {
      priceship = 10000
    } if (item.weight > 1 && item.weight <= 5) {
      priceship = 20000
    } 
    if (item.weight > 5) {
      priceship = item.weight * 10000
    }
    

    if (voucherId && voucher) {
      if (voucher.quantity <= 0) {
        throw new BadRequestException(`Code ${voucher.code} don't have any left`);
      }
      if ( itemPrice >= voucher.min) {
        if (voucher.discount) {
          if ( voucher.type === 'DISCOUNT') {
            itemPriceVoucher = (voucher.discount / 100) * itemPrice
          } else if (voucher.type === 'SHIPING') {
            priceShipVoucher = (voucher.discount / 100) * priceship
          }
          
        } else if (!voucher.discount) {
          if (voucher.type === 'DISCOUNT') {
            itemPriceVoucher = voucher.max
          } else if (voucher.type === 'SHIPING') {
            priceShipVoucher = voucher.min
          }
        }
      } else {
        throw new BadRequestException(`Price of item must over ${voucher.min}`)
      }
    } else {

    }

    let itemPriceAfterAdFlashSaleAndVoucher = itemPrice - itemPriceVoucher - itemPriceFlashSale
    if (itemPriceAfterAdFlashSaleAndVoucher < 0 ) itemPriceAfterAdFlashSaleAndVoucher = 0

    let shipPriceAfterAdVoucher = priceship - priceShipVoucher
    if (shipPriceAfterAdVoucher < 0) shipPriceAfterAdVoucher = 0
    const totalFinalPrice = itemPriceAfterAdFlashSaleAndVoucher + shipPriceAfterAdVoucher

    item.quantity = item.quantity - quantity
    await this.itemRepository.save(item)


    const order = await this.orderRepository.create({
      ...createOrderDto,
      shippingPrice: shipPriceAfterAdVoucher,
      itemPrice: itemPriceAfterAdFlashSaleAndVoucher,
      total: totalFinalPrice,
      status: OrderStatus.WAITING,
      user,
      voucher,
      address
    })
    await this.orderRepository.save(order)


    const orderdetail = await this.orderDetailRepository.create({
      ...createOrderDetailDto,
      order,
      item,
      itemflashsale,
      price: item.price,
    })
    await this.orderDetailRepository.save(orderdetail)
    return order
  }

  async findAll(user: User, filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;

    const query = this.orderRepository.createQueryBuilder('order');
    query.where({ user });

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    const orders = await query.getMany();
    return orders;
  }

  async findOne(id: string, user: User) {
    const found = await this.orderRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, user: User) {
    const order = await this.findOne(id, user);
    const { status } = updateOrderDto

    order.status = status;
    await this.orderRepository.save(order);

    return order;
  }

  async remove(id: string, user: User) {
    const result = await this.orderRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`order with ID "${id}" not found`);
    }
  }
}
