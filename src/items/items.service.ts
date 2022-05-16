import { CategoryRepository } from './../category/category.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './item.repository';
import { ItemStatus } from './status/item-status.enum';
import * as moment from 'moment';
import { Item } from './entities/item.entity';
import { GetItemFilterDto } from './dto/get-item-filter.dto';
import * as fs from 'fs';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private categoryRepository: CategoryRepository,
  ) { }

  async create(createItemDto: CreateItemDto, file: Express.Multer.File, files: Array<Express.Multer.File>) {
    const { categoryId, orderDetailId } = createItemDto
    const category = await this.categoryRepository.findOne(categoryId)
    const newDate = moment().format()
    // for (let i = 0; i < files.length; i++) {
    //   const element = files[i].path;

    // }
    const item = this.itemRepository.create({
      ...createItemDto,
      status: ItemStatus.INACTIVE,
      avatar: file.path,
      // image: element,
      create_at: newDate,
      category,
    })
    const newitem =await this.itemRepository.save(item)
    return newitem
  }

  async findAll(filterDto: GetItemFilterDto): Promise<Item[]> {
    const { search } = filterDto
    const query = this.itemRepository.createQueryBuilder('item')

    if (search) {
      query.andWhere('LOWER(item.name) LIKE LOWER(:search)OR LOWER(item.description) LIKE LOWER(:search)', { search: `%${search}%` })
    }

    const item = await query.getMany()
    return item
  }

  findOne(id: string): Promise<Item> {
    const found = this.itemRepository.findOne(id)
    if (!found) {
      throw new BadRequestException(`Item id: ${id} not found`);
    }
    return found
  }

  async update(id: string, file: Express.Multer.File, updateItemDto: UpdateItemDto): Promise<Item> {
    console.log(file);
    
    const { name, barcode, price, weight, quantity, description, status } = updateItemDto

    const newDate = moment().format()


    const item = await this.findOne(id)
    try {
      if (fs.existsSync(item.avatar)) {
        fs.unlinkSync(`./${item.avatar}`)
      }

    } catch (error) {
      throw new BadRequestException("mất ảnh");

    }


    if (name) {
      item.name = name;
    }
    if (barcode) {
      item.barcode = barcode;
    }
    if (price) {
      item.price = price;
    }
    if (weight) {
      item.weight = weight;
    }
    if (quantity) {
      item.quantity = quantity;
    }
    if (description) {
      item.description = description;
    }
    if (status) {
      item.status = status;
    }

    item.avatar = file.path
    item.update_at = newDate

    const result = await this.itemRepository.save(item)
    return result
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
  }
}
