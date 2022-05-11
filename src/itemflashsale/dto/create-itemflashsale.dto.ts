import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateItemflashsaleDto {
    @IsNumber()
    @Type(() => Number)
    discount: number

    @IsNumber()
    @Type(() => Number)
    quantity: number

    @IsBoolean()
    @IsOptional()
    issale: boolean

    @IsUUID()
    itemId: string;
}
