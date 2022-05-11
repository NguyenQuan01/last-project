import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FlashsaleService } from './flashsale.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { Flashsale } from './entities/flashsale.entity';
import { GetFlashsaleFilterDto } from './dto/get-flashsale-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('flashsale')
@UseGuards(AuthGuard())
export class FlashsaleController {
  constructor(private readonly flashsaleService: FlashsaleService) { }

  @Post()
  create(@Body() createFlashsaleDto: CreateFlashsaleDto): Promise<Flashsale> {
    return this.flashsaleService.create(createFlashsaleDto);
  }

  @Get()
  findAll(getFlashsaleFilterDto: GetFlashsaleFilterDto): Promise<Flashsale[]> {
    return this.flashsaleService.findAll(getFlashsaleFilterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Flashsale> {
    return this.flashsaleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlashsaleDto: UpdateFlashsaleDto) {
    return this.flashsaleService.update(id, updateFlashsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.flashsaleService.remove(id);
  }
}
