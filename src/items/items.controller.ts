import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards, UploadedFiles } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './update-filename.sto';
import { imageFileFilter } from 'src/items/dto/file-filter.dto';
import { GetItemFilterDto } from './dto/get-item-filter.dto';
import { Item } from './entities/item.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post('/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './image',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createItemDto: CreateItemDto,
    @Param('id') id: string

  ): Promise<void> {
    return this.itemsService.create(createItemDto, file, files, id);
  }

  @Get()
  findAll(
    @Query() filterDto: GetItemFilterDto,
  ): Promise<Item[]> {
    return this.itemsService.findAll(filterDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './image',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
  )
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Item> {
    return this.itemsService.update(id, file, updateItemDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.itemsService.remove(id);
  }
}
