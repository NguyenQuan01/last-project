import { IsOptional, IsString } from 'class-validator';

export class GetFlashsaleFilterDto {

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