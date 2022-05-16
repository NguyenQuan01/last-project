import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    phone: number
    
    @IsString()
    @IsOptional()
    address: string
}
