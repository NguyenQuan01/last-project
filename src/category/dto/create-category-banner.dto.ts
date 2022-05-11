import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryBannerDto {
    @IsNumber()
    @IsOptional()
    position: number

    @IsString()
    @IsOptional()
    url: string
}