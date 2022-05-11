import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleStatus } from '../status/role-status.enum';

export class GetUserFilterDto {

    @IsOptional()
    @IsEnum(RoleStatus)
    role: RoleStatus

    @IsOptional()
    @IsString()
    search?: string;
}