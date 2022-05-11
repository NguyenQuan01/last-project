import { Type } from "class-transformer";
import { type } from "os";
import { User } from "src/user/entity/user..entity";
import { Voucher } from "src/voucher/entities/voucher.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderDetail } from "./orderdetail.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'float' })
    shippingPrice: number

    @Column({ type: 'float' })
    itemPrice: number

    @Column({ type: 'float' })
    total: number

    @CreateDateColumn({ type: 'timestamp' })
    createat: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updateat: Date

    @ManyToOne((_type) => User, (user) => user.order, { eager: false })
    user: User

    @OneToMany((_type) => OrderDetail, (orderDetail) => orderDetail.order, { eager: false })
    orderDetail: OrderDetail[]

    @ManyToOne((_type) => Voucher, (voucher) => voucher.order, { eager: false })
    voucher: Voucher
}
