import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemflashsaleService } from './itemflashsale.service';
import { CreateItemflashsaleDto } from './dto/create-itemflashsale.dto';
import { UpdateItemflashsaleDto } from './dto/update-itemflashsale.dto';
import { Itemflashsale } from './entities/itemflashsale.entity';
import { GetItemFlashsaleFilterDto } from './dto/get-itemflashsale-filter.dto';

@Controller('itemflashsale')
export class ItemflashsaleController {
  constructor(private readonly itemflashsaleService: ItemflashsaleService) { }

  @Post('/:id')
  create(@Body() createItemflashsaleDto: CreateItemflashsaleDto, @Param('id') id: string): Promise<Itemflashsale> {
    return this.itemflashsaleService.create(createItemflashsaleDto, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Itemflashsale> {
    return this.itemflashsaleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemflashsaleDto: UpdateItemflashsaleDto): Promise<Itemflashsale> {
    return this.itemflashsaleService.update(id, updateItemflashsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.itemflashsaleService.remove(id);
  }
}
