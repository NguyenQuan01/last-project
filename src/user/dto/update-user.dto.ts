import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { GenderStatus } from '../status/gender-status.enum';
import { RoleStatus } from '../status/role-status.enum';

export class UpdateUserDto {

    @IsString()
    name: string;
    
    @IsString()
    phone: string;

    @IsDateString()
    dateOfBirth: Date

    @IsString()
    address: string

    @IsString()
    @IsOptional()
    avatar: string

    @IsEnum(GenderStatus)
    gender: GenderStatus;

    @IsEnum(RoleStatus)
    role: RoleStatus
}