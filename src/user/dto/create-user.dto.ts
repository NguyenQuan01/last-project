import { IsBooleanString, IsDateString, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator'
import { IsString } from "class-validator"

export class CreateUserDto {

    @IsEmail({ unique: true })
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: 'password is too weak'
        })
    password: string

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsDateString()
    dateOfBirth: Date

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    avatar: string

    // @IsBooleanString()
    // @IsOptional()
    // verify: boolean

}