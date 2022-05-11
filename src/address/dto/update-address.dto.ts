import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    @Type(() => Number)
    phone: number

    @IsNumber()
    @IsOptional()
    address: string
}
