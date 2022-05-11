import { UpdatePasswordDto } from './dto/update-password.dto';
import { Body, Controller, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/user/entity/user..entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/user/update-filename.sto';
import { imageFileFilter } from 'src/user/dto/file-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

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
        console.log(file);
        return this.authService.signUp(createUserDto, file)
    }

    @Post('/signin')
    signIn(@Body() createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(createAuthDto)
    }

    @Patch('/:id/updatePassword')
    changePassword(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto
    ): Promise<User> {
        const { password } = updatePasswordDto
        return this.authService.updatePassword(id, password)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
        
    }
}
