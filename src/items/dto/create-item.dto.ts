import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class CreateItemDto {
    @IsString()
    name: string

    @IsString()
    barcode: string

    @IsNumber()
    @Type(() => Number)
    price: number

    @IsNumberString()
    @ApiProperty({ type: 'number', format: 'float' })
    @IsNotEmpty()
    weight: number;

    // @IsNumber()
    // @Type(() => Number)
    // weight: number

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

    categoryId: string

    orderDetailId: string
}
