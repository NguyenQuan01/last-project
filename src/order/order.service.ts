import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ItemflashsaleRepository } from 'src/itemflashsale/itemflashsale.repository';
import { ItemRepository } from 'src/items/item.repository';
import { User } from 'src/user/entity/user..entity';
import { VoucherRepository } from 'src/voucher/voucher.repositoty';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { OrderDetailRepository } from './orderDetail.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private orderDetailRepository: OrderDetailRepository,
    private voucherRepository: VoucherRepository,
    private itemflashsaleRepository: ItemflashsaleRepository,
    private itemRepository: ItemRepository,
  ) { }
  async create(createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto, user: User) {
    const { voucherId, code } = createOrderDto
    const { quantity, price, itemId, itemflashsaleId } = createOrderDetailDto

    const voucher = await this.voucherRepository.findOne(voucherId)
    const itemflashsale = await this.itemflashsaleRepository.findOne(itemflashsaleId)
    const item = await this.itemRepository.findOne(itemId)

    let priceship = 0
    if (item.weight < 1) {
      priceship = 10000
    } if (item.weight > 1 && item.weight < 5) {
      priceship = 30000
    } else {
      priceship = item.weight * 10000
    }
    const itemcost = quantity * price
    let totalcost = itemcost + priceship


    let voucherOrder = await this.voucherRepository.findOne({code});
    if (voucherOrder.quantity <= 0) {
      throw new BadRequestException(`Code ${code} don't have any left`);
    }

    let discountship = 0
    let discountprice = 0
    if (voucherOrder) {
        if (voucherOrder.type === 'DISCOUNT') {
          if (itemcost >= voucher.min) {
            discountprice = ((100 - voucher.discount) / 100) * itemcost
            if (itemcost - discountprice > voucher.max) {
              discountprice = itemcost - voucher.max
            }
          }
          totalcost = priceship + discountprice
        }

        if (voucherOrder.type === 'SHIPING') {
          if (itemcost >= voucher.min) {
            discountship = ((100 - voucher.discount) / 100) * priceship
            if (priceship - discountship > voucher.max) {
              discountship = priceship - voucher.max
            }
          }
          totalcost = discountship + itemcost
        }


    } else {
      throw new NotFoundException(`Wrong code. Please check again`);
    }


    const order = await this.orderRepository.create({
      ...createOrderDto,
      shippingPrice: priceship,
      itemPrice: itemcost,
      total: totalcost,
      user,
      voucher
    })
    await this.orderRepository.save(order)

    /// orderdetail


    const orderdetail = await this.orderDetailRepository.create({
      ...createOrderDetailDto,
      order,
      item,
      itemflashsale
    })
    await this.orderDetailRepository.save(orderdetail)
    return order
  }

  findAll(user: User) {
    return `This action returns all order`;
  }

  findOne(id: string, user: User) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto, user: User) {
    return `This action updates a #${id} order`;
  }

  remove(id: string, user: User) {
    return `This action removes a #${id} order`;
  }
}
