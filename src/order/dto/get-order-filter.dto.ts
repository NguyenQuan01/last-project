import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../status/order-status.enum';

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsString()
    search?: string;
}
