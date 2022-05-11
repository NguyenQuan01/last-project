import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class CreateOrderDetailDto {
    @IsNumber()
    @Type(() => Number)
    quantity: number

    @IsNumber()
    @Type(() => Number)
    price: number

    itemId: string

    itemflashsaleId: string

}