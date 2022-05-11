import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoryStatus } from "../status/category.status";

export class UpdateCategoryDto{
    @IsString()
    @IsOptional()
    name: string

    @IsEnum(CategoryStatus)
    @IsOptional()
    categoryStatus: CategoryStatus

    @ApiProperty({
        description: '[Number]',
    })
    @IsOptional()
    // @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    position: number[]

    @IsString()
    @IsOptional()
    url: string
}
