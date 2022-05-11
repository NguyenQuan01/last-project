import { User } from "src/user/entity/user..entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    user: User
}
