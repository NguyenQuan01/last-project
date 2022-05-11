import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVoucherDto {
    @IsString()
    @IsOptional()
    code: string

    @IsString()
    @IsOptional()
    note: string

    @IsNumber()
    @Type(() => Number)
    discount: number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    max: number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    min: number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    quantity: number

    @IsDate()
    @Type(() => Date)
    startTime: Date

    @IsDate()
    @Type(() => Date)
    endTime: Date
}
