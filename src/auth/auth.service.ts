import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt'
import { JwtPayLoad } from './jwt-payload.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/user/entity/user..entity';
import { UserService } from 'src/user/user.service';
// import { DatabaseFilesService } from 'src/database-files/database-files.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private userService: UserService,
        // private databaseFilesService: DatabaseFilesService,
    ) { }

    async signUp(createUserDto: CreateUserDto, file: any): Promise<void> {
        // const avatar = await this.databaseFilesService.uploadDatabaseFile(file.filename, file.originalname);
        return this.userRepository.createUser(createUserDto, file)
    }

    async signIn(createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
        const { email, password } = createAuthDto
        const user = await this.userRepository.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayLoad = { email }
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }
        } else {
            throw new UnauthorizedException('please check out your email or password')
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt);
    }

    async updatePassword(id: string, password: string): Promise<User> {
        const user = await this.userService.getUserById(id)
        const hashPassword = await this.hashPassword(password);
        user.password = hashPassword

        await this.userRepository.save(user)

        return user
    }
}
