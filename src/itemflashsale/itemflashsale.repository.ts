import { EntityRepository, Repository } from "typeorm";
import { Itemflashsale } from "./entities/itemflashsale.entity";

@EntityRepository(Itemflashsale)
export class ItemflashsaleRepository extends Repository<Itemflashsale>{ }