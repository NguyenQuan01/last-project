import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeStatus } from "../status/type-status.enum";

@Entity()
export class Voucher {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    code: string

    @Column()
    type: TypeStatus

    @Column()
    note: string

    @Column()
    discount: number

    @Column()
    max: number

    @Column()
    min: number

    @Column()
    quantity: number

    @Column({ type: 'timestamptz' })
    startTime: Date

    @Column({ type: 'timestamptz' })
    endTime: Date

    @OneToMany((_type) => Order, (order) => order.voucher, { eager: false })
    order: Order[]
}
