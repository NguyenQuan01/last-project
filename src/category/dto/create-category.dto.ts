import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
