import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { ItemStatus } from "../status/item-status.enum"

export class UpdateItemDto {
    @IsString()
    name: string

    @IsString()
    barcode: string

    @IsNumber()
    @Type(() => Number)
    price: number

    @IsNumber()
    @Type(() => Number)
    weight: number

    @IsNumber()
    @Type(() => Number)
    quantity: number

    @IsString()
    description: string

    @IsEnum(ItemStatus)
    status: ItemStatus;
}
