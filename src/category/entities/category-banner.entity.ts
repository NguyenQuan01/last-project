import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class CategoryBanner {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    position: number

    @Column()
    url: string

    @ManyToOne((_type) => Category, (category) => category.categoryBanner, { eager: false })
    @Exclude({ toPlainOnly: true })
    category: Category
}