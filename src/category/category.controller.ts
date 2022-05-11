import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FormDataRequest } from 'nestjs-form-data';
import { imageFileFilter } from 'src/user/dto/file-filter.dto';
import { editFileName } from 'src/user/update-filename.sto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetTasksFilterDto } from './dto/get-category-filter.dto';
import { UpdateCategoryBannerDto } from './dto/update-category-banner.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() file: Array<Express.Multer.File>
  ): Promise<void> {
    // console.log(file);
    return this.categoryService.create(createCategoryDto, file);
  }

  @Get()
  findAll(
    @Query() filterDto: GetTasksFilterDto
  ): Promise<Category[]> {
    return this.categoryService.findAll(filterDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  // @FormDataRequest()
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    // console.log(file);

    return this.categoryService.update(id, updateCategoryDto, file);
  }

  // @Patch('/update-caategory-banner/:id')
  // @UseInterceptors(
  //   FilesInterceptor('images', 20, {
  //     storage: diskStorage({
  //       destination: './images',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // updateBanner(
  //   @Param('id') id: string, @Body() updateCategoryBannerDto: UpdateCategoryBannerDto,
  //   @UploadedFiles() file: Array<Express.Multer.File>
  //   ) {
  //   return this.categoryService.updateBanner(id, updateCategoryBannerDto, file);
  // }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
