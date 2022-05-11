import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAddressFilterDto {

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    phone?: number

    @IsOptional()
    @IsString()
    string?: string;

    @IsOptional()
    @IsString()
    search?: string;
}