import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FlashsaleRepository } from 'src/flashsale/flashsale.repository';
import { ItemRepository } from 'src/items/item.repository';
import { ItemsService } from 'src/items/items.service';
import { createQueryBuilder } from 'typeorm';
import { CreateItemflashsaleDto } from './dto/create-itemflashsale.dto';
import { GetItemFlashsaleFilterDto } from './dto/get-itemflashsale-filter.dto';
import { UpdateItemflashsaleDto } from './dto/update-itemflashsale.dto';
import { Itemflashsale } from './entities/itemflashsale.entity';
import { ItemflashsaleRepository } from './itemflashsale.repository';

@Injectable()
export class ItemflashsaleService {
  constructor(
    private itemflashsaleRepository: ItemflashsaleRepository,
    private itemRepository: ItemRepository,
    private flashsaleRepository: FlashsaleRepository,
  ) { }
  async create(createItemflashsaleDto: CreateItemflashsaleDto): Promise<Itemflashsale> {
    const { quantity, itemId, flashsaleId } = createItemflashsaleDto
    const item = await this.itemRepository.findOne(itemId)
    const flashsale = await this.flashsaleRepository.findOne(flashsaleId)
    if (item.quantity < quantity) {
      throw new BadRequestException('Quantity of flashsale must be less or equal quantity of item')
    } else {
      const itemflashsale = this.itemflashsaleRepository.create({
        ...createItemflashsaleDto,
        issale: false,
        flashsale,
        item
      })

      await this.itemflashsaleRepository.save(itemflashsale)
      return itemflashsale
    }
  }

  findOne(id: string): Promise<Itemflashsale> {
    const found = this.itemflashsaleRepository.findOne(id)
    if (!found) {
      throw new BadRequestException(`itemflashsale id: ${id} not found`);
    }
    return found
  }

  async update(id: string, updateItemflashsaleDto: UpdateItemflashsaleDto): Promise<Itemflashsale> {
    const { discount, quantity, issale } = updateItemflashsaleDto
    const itemflashsale = await this.itemflashsaleRepository.findOne(id)
    if (discount) {
      itemflashsale.discount = discount;
    }
    if (quantity) {
      itemflashsale.quantity = quantity;
    }

    if (issale) {
      itemflashsale.issale = issale;
    }

    const result = await this.itemflashsaleRepository.save(itemflashsale)
    return result
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemflashsaleRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`itemflashsale with ID "${id}" not found`);
    }
  }
}
