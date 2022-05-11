import { Itemflashsale } from "src/itemflashsale/entities/itemflashsale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flashsale {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'timestamptz' })
    startsale: Date

    @Column({ type: 'timestamptz' })
    endsale: Date

    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    createat: Date

    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    updateat: string

    @OneToMany((_type) => Itemflashsale, (itemFlashsale) => itemFlashsale.flashsale, { eager: false })
    itemFlashsale: Itemflashsale[]
}
