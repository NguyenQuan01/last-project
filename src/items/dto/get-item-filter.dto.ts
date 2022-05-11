import { IsOptional, IsString } from 'class-validator';

export class GetItemFilterDto {

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    search?: string;
}