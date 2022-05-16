import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt'
import { JwtPayLoad } from './jwt-payload.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/user/entity/user..entity';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GenderStatus } from 'src/user/status/gender-status.enum';
import { RoleStatus } from 'src/user/status/role-status.enum';
// import { DatabaseFilesService } from 'src/database-files/database-files.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private userService: UserService,
        private mailService: MailService,
        // private databaseFilesService: DatabaseFilesService,
    ) { }

    async signUp(createUserDto: CreateUserDto, file: any): Promise<void> {
        const { password } = createUserDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            gender: GenderStatus.UNDEFINE,
            role: RoleStatus.USER,
            verifyCode: uuid(),
            avatar: file.path
        })

        try {
            await this.userRepository.save(user)

            const { email } = createUserDto
            this.sendMailVerifyUser(email);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('email already use')
            } else {
                throw new InternalServerErrorException()
            }
        }



        // const avatar = await this.databaseFilesService.uploadDatabaseFile(file.filename, file.originalname);
        // return this.userRepository.createUser(createUserDto, file)
    }

    async sendMailVerifyUser(email: string) {
        const user = await this.userRepository.findOne({ email });

        console.log(user);


        if (!user)
            throw new NotFoundException(`User email ${email} not found.`);

        if (user.verify) throw new BadRequestException('Verified account.');

        let url = 'http://localhost:3000/auth/verify?email=' + email + '&verifyCode=' + user.verifyCode;

        await this.mailService.sendMailVerify(url, email);

        // user.updated_at = new Date(currentDate);
        await this.userRepository.save(user);
    }

    async verifyUser(verifyUserDto: VerifyUserDto) {
        const { email, verifyCode } = verifyUserDto;

        console.log('email', email);
        console.log('verifyCode', verifyCode);


        const user = await this.userRepository.findOne({ email });

        if (!user)
            throw new BadRequestException('Something wrong. Please check again !');

        if (user.verifyCode !== verifyCode)
            throw new BadRequestException('Bad verify code');

        user.verify = true;
        user.verifyCode = null;

        await this.userRepository.save(user);
    }

    async signIn(createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
        const { email, password } = createAuthDto
        const user = await this.userRepository.findOne({ email })
        console.log(user);
        

        if (!user.verify) {
            throw new BadRequestException('please verify email to signin !');
        }

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





    async sendMailForgotPassword(email: string) {
        const user = await this.userRepository.findOne({ email });

        if (!user)
            throw new NotFoundException(`User have email ${email} not found.`);

        if (!user.verify) {
            throw new BadRequestException(`Please verify your email.`);
        }

        user.verifyCode = uuid();

        const url = 'http://localhost:3000/auth/forgot_password?email=' + email + '&verifyCode=' + user.verifyCode;

        await this.mailService.sendMailForgotPassword(url, email);

        await this.userRepository.save(user)
    }

    async forgotAndChangePassword(verifyUserDto: VerifyUserDto, password: string) {
        const { email, verifyCode } = verifyUserDto;
        console.log(verifyCode);


        const user = await this.userRepository.findOne({ email });
        console.log(user.verifyCode);

        if (!user) throw new NotFoundException(`User not exists.`);

        if (user.verifyCode !== verifyCode)
            throw new BadRequestException('Bad verify code');

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        //remove verify code
        user.verifyCode = null;

        await this.userRepository.save(user);

        return user;
    }
}
