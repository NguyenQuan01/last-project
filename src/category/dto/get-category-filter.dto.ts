import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryStatus } from '../status/category.status';

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(CategoryStatus)
    categoryStatus?: CategoryStatus;

    @IsOptional()
    @IsString()
    search?: string;
}