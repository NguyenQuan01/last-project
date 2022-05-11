import { Itemflashsale } from "src/itemflashsale/entities/itemflashsale.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    quantity: number

    @Column()
    price: number

    @ManyToOne(_type => Order, order => order.orderDetail, { eager: false })
    order: Order
    
    @ManyToOne(_type => Item, item => item.orderDetail, { eager: false })
    item: Item
    
    @ManyToOne(_type => Itemflashsale, itemflashsale => itemflashsale.orderDetail, { eager: false })
    itemflashsale: Itemflashsale
}