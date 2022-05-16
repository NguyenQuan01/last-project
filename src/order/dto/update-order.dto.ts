import { IsEnum } from 'class-validator';
import { OrderStatus } from '../status/order-status.enum';

export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
