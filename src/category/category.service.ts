import { CategoryRepository } from './category.repository';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { GetTasksFilterDto } from './dto/get-category-filter.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryBannerRepository } from './categoryBanner.repository';
import { CategoryStatus } from './status/category.status';
import { UpdateCategoryBannerDto } from './dto/update-category-banner.dto';
import * as fs from 'fs';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private categoryBannerRepository: CategoryBannerRepository
  ) { }

  async create(createCategoryDto: CreateCategoryDto, file: Array<Express.Multer.File>): Promise<void> {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      categoryStatus: CategoryStatus.INACTIVE
    })
    await this.categoryRepository.save(category)

    for (let i = 0; i < file.length; i++) {
      const element = file[i];
      const categoryBanner = this.categoryBannerRepository.create({
        position: i + 1,
        url: element.path,
        category
      })
      await this.categoryBannerRepository.save(categoryBanner)
    }
  }

  findAll(filterDto: GetTasksFilterDto): Promise<Category[]> {
    return this.categoryRepository.getCategory(filterDto)
  }
  async findOne(id: string) {
    const found = await this.categoryRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`category with ID "${id}" not found`);
    }
    return found;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file: Array<Express.Multer.File>): Promise<void> {
    const { name, categoryStatus, position, url } = updateCategoryDto;

    const category = await this.findOne(id)
    category.categoryStatus = categoryStatus
    category.name = name
    await this.categoryRepository.save(category)

    const categoryBanner = await this.categoryBannerRepository.find({ category })

    for (let i = 0; i < categoryBanner.length; i++) {
      if (fs.existsSync(categoryBanner[i].url)) {
        fs.unlinkSync(`./${categoryBanner[i].url}`)
      }
    }

    for (let i = 0; i < file.length; i++) {
      const element = file[i];
      const resoult = await this.categoryBannerRepository.update({ category }, {
        position: i + 1,
        url: element.path,
        category
      })

      console.log(resoult);
      
      // await this.categoryBannerRepository.save(categoryBanner)
    }
    // if (category) {
    //   console.log(categoryBanner);




    // if (position && position.length == categoryBanner.length) {
    //   console.log('oke');

    // }else{
    //   console.log('none');

    // }

    // if (catetgoryBanner.url) {
    //   fs.unlinkSync(`./${catetgoryBanner.url}`)
    // }

    // for (let i = 0; i < file.length; i++) {
    //   const element = file[i];
    //   const categoryBanner = await this.categoryBannerRepository.findOne({
    //     position: i + 1,
    //     url: element.path,
    //   });
    //   const result = await this.categoryBannerRepository.save(categoryBanner)
    //   console.log(result);
    // }
    // }
  }

  async remove(id: string) {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted.affected) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
  }
}
