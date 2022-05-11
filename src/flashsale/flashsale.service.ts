import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { GetFlashsaleFilterDto } from './dto/get-flashsale-filter.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { Flashsale } from './entities/flashsale.entity';
import { FlashsaleRepository } from './flashsale.repository';

@Injectable()
export class FlashsaleService {
  constructor(
    private flashsaleRepository: FlashsaleRepository,
  ) { }
  async create(createFlashsaleDto: CreateFlashsaleDto): Promise<Flashsale> {
    const newDate = moment().format()
    const flashsale = this.flashsaleRepository.create({
      ...createFlashsaleDto,
      createat: newDate,
    })

    await this.flashsaleRepository.save(flashsale)
    return flashsale
  }

  async findAll(getFlashsaleFilterDto: GetFlashsaleFilterDto): Promise<Flashsale[]> {
    const { search } = getFlashsaleFilterDto
    const query = this.flashsaleRepository.createQueryBuilder('flashsale')

    if (search) {
      query.andWhere('LOWER(flashsale.name) LIKE LOWER(:search)OR LOWER(flashsale.description) LIKE LOWER(:search)', { search: `%${search}%` })
    }

    const flashsale = await query.getMany()
    return flashsale
  }

  findOne(id: string): Promise<Flashsale> {
    const found = this.flashsaleRepository.findOne(id)
    if (!found) {
      throw new BadRequestException(`flashsale id: ${id} not found`);
    }
    return found
  }

  async update(id: string, updateFlashsaleDto: UpdateFlashsaleDto) {
    const { name, description, startsale, endsale } = updateFlashsaleDto
    const newDate = moment().format()
    const flashsale = await this.findOne(id)

    if (name) {
      flashsale.name = name;
    }
    if (description) {
      flashsale.description = description;
    }
    if (startsale) {
      flashsale.startsale = startsale;
    }
    if (endsale) {
      flashsale.endsale = endsale;
    }

    flashsale.updateat = newDate

    const result = await this.flashsaleRepository.save(flashsale)
    return result
  }

  async remove(id: string): Promise<void> {
    const result = await this.flashsaleRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`flashsale with ID "${id}" not found`);
    }
  }
}
