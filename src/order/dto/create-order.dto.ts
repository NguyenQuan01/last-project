import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class CreateOrderDto {
    // @IsNumber()
    // @Type(() => Number)
    // shippingPrice: number

    // @IsNumber()
    // @Type(() => Number)
    // itemPrice: number

    // @IsNumber()
    // @Type(() => Number)
    // total: number

    voucherId: string

    @IsOptional()
    code: string
}
