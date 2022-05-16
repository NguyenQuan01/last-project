import { Exclude } from "class-transformer";
import { Flashsale } from "src/flashsale/entities/flashsale.entity";
import { Item } from "src/items/entities/item.entity";
import { OrderDetail } from "src/order/entities/orderdetail.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Itemflashsale {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    discount: number

    @Column()
    quantity: number

    @Column()
    issale: boolean

    @ManyToOne((_type) => Flashsale, (flashsale) => flashsale.itemFlashsale, { eager: false })
    flashsale: Flashsale

    @ManyToOne((_type) => Item, (item) => item.itemFlashsale, { eager: false })
    item: Item

    @OneToMany((_type) => OrderDetail, (orderDetail) => orderDetail.item, { eager: false })
    orderDetail: OrderDetail[]
}
