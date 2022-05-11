import { IsOptional, IsString } from 'class-validator';

export class GetItemFlashsaleFilterDto {

    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @IsString()
    itemId?: string

    @IsOptional()
    @IsString()
    flashsaleId?: string;
}