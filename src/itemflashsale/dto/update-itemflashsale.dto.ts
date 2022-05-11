import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateItemflashsaleDto {
    @IsNumber()
    @Type(() => Number)
    discount: number

    @IsNumber()
    @Type(() => Number)
    quantity: number
}
