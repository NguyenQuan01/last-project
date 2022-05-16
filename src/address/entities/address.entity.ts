import { Exclude } from "class-transformer";
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entity/user..entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    phone: number

    @Column()
    address: string

    @ManyToOne(_type => User, user => user.adderss, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User

    @OneToMany((_type) => Order, (order) => order.address, { eager: false })
    order: Order[]
}
