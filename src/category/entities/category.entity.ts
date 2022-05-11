import { Item } from "src/items/entities/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryStatus } from "../status/category.status";
import { CategoryBanner } from "./category-banner.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    categoryStatus: CategoryStatus

    @OneToMany((_type) => CategoryBanner, (categoryBanner) => categoryBanner.category, {eager: false})
    categoryBanner: CategoryBanner[]
    
    @OneToMany((_type) => Item, (item) => item.category, {eager: false})
    item: Item[]
}