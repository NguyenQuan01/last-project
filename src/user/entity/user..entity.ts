import { Address } from "src/address/entities/address.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { GenderStatus } from "../status/gender-status.enum";
import { RoleStatus } from "../status/role-status.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    phone: string;

    @Column()
    dateOfBirth: Date;

    @Column({ nullable: true })
    gender: GenderStatus;

    @Column({ nullable: true })
    role: RoleStatus

    @Column({ nullable: true })
    avatar: string

    @Column()
    verify: boolean

    @OneToMany(_type => Address, address => address.user, {eager: true})
    adderss: Address[]
    
    @OneToMany(_type => Order, order => order.user, {eager: true})
    order: Order[]
}