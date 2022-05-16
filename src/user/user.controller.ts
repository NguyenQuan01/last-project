import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User } from './entity/user..entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/user/update-filename.sto';
import { imageFileFilter } from 'src/user/dto/file-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { VerifyUserDto } from 'src/auth/dto/verify-user.dto';
import { RoleGuard } from 'src/custom/role.guard';

@Controller('user')

export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    @UseGuards(AuthGuard())
    getTasks(
        @Query() filterDto: GetUserFilterDto,
    ): Promise<User[]> {
        return this.userService.getUser(filterDto);
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './image',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),
    )
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @UploadedFile() file,
    ): Promise<User> {
        const { gender, role } = updateUserDto;
        return this.userService.updateUser(id, gender, role, file);
    }


    @Delete('/:id')
    @UseGuards(AuthGuard())
    remove(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
