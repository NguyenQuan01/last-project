import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryBannerDto {
    @IsNumber()
    position: number[]

    @IsString()
    url: string
}