import { EntityRepository, Repository } from "typeorm";
import { OrderDetail } from "./entities/orderdetail.entity";

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail>{

}