import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateFlashsaleDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startsale: Date

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endsale: Date
}
