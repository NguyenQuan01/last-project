import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateItemDto {
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

    @IsString()
    @IsOptional()
    avatar: string

    // @IsString()
    // @IsOptional()
    // image: string[]

    @IsNumber()
    @Type(() => Number)
    quantity: number

    @IsString()
    description: string
}
