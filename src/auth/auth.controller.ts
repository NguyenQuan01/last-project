import { UpdatePasswordDto } from './dto/update-password.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/user/entity/user..entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/user/update-filename.sto';
import { imageFileFilter } from 'src/user/dto/file-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }


    @Get('/verify')
    verifyUser(@Query() verifyUserDto: VerifyUserDto) {
        return this.authService.verifyUser(verifyUserDto);
    }



    @Post('/signup')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './image',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),
    )
    signUp(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() file
    ): Promise<void> {
        return this.authService.signUp(createUserDto, file)
    }

    @Post('/signin')
    signIn(@Body() createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(createAuthDto)
    }

    @Patch('/:id/updatePassword')
    @UseGuards(AuthGuard())
    changePassword(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto
    ): Promise<User> {
        const { password } = updatePasswordDto
        return this.authService.updatePassword(id, password)
    }

    @Patch('/forgot_password')
    forgotPassword(
        @Query() verifyUserDto: VerifyUserDto,
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ) {
        const { password } = forgotPasswordDto
        return this.authService.forgotAndChangePassword(verifyUserDto, password);
    }

    @Post('/send_mail_forgot_password')
    sendMailForgotPassword(@Body('email') email: string) {
        return this.authService.sendMailForgotPassword(email);
    }
}
