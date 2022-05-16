import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateItemflashsaleDto {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    discount: number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    quantity: number

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    issale: boolean
}
