import { EntityRepository, Repository } from "typeorm";
import { CategoryBanner } from "./entities/category-banner.entity";

@EntityRepository(CategoryBanner)
export class CategoryBannerRepository extends Repository<CategoryBanner>{

}