import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateCategoryBannerDto } from "./dto/create-category-banner.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetTasksFilterDto } from "./dto/get-category-filter.dto";
import { Category } from "./entities/category.entity";
import { CategoryStatus } from "./status/category.status";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{

    // async createCategory(createCategoryDto: CreateCategoryDto, createCategoryBannerDto: CreateCategoryBannerDto, file: Array<Express.Multer.File>): Promise<void> {
        
    //     try {
            // const category = this.create({
            //     ...createCategoryDto,
            //     categoryStatus: CategoryStatus.INACTIVE
            // })
            // await this.save(category)

            // file.forEach(async (element, index) => {
            //     const categoryBanner = this.create({
            //         position: index + 1,
            //         url: element.path,
            //         category
            //     })
            //     await this.save(categoryBanner)
            // });
    //     } catch (error) {
    //         if (error.code === '23505') {
    //             throw new ConflictException('category already use')
    //         } else {
    //             throw new InternalServerErrorException()
    //         }
    //     }
    // }

    async getCategory(filterDto: GetTasksFilterDto): Promise<Category[]> {
        const { categoryStatus, search } = filterDto;

        const query = this.createQueryBuilder('category');

        if (categoryStatus) {
            query.andWhere('task.categoryStatus = :categoryStatus', { categoryStatus });
        }

        if (search) {
            query.andWhere(
                '(LOWER(category.nameCategory) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }
}