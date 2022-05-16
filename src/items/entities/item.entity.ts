import { Exclude } from "class-transformer";
import { Category } from "src/category/entities/category.entity";
import { Itemflashsale } from "src/itemflashsale/entities/itemflashsale.entity";
import { OrderDetail } from "src/order/entities/orderdetail.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemStatus } from "../status/item-status.enum";

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    barcode: string

    @Column()
    price: number

    @Column({ type: 'float' })
    weight: number

    @Column()
    avatar: string

    // @Column("text", { array: true })
    // image: string[]

    @Column()
    quantity: number

    @Column()
    description: string

    @Column()
    status: ItemStatus

    @CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date

    @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    update_at: string

    @ManyToOne((_type) => Category, (category) => category.item, { eager: false })
    @Exclude({ toPlainOnly: true })
    category: Category

    @OneToMany((_type) => Itemflashsale, (itemFlashsale) => itemFlashsale.item, { eager: false })
    itemFlashsale: Itemflashsale[]

    @OneToMany((_type) => OrderDetail, (orderDetail) => orderDetail.item, { eager: false })
    orderDetail: OrderDetail[]
}
