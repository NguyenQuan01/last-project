import { EntityRepository, Repository } from "typeorm";
import { User } from "./entity/user..entity";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "./dto/create-user.dto";
import { GenderStatus } from "./status/gender-status.enum";
import { RoleStatus } from "./status/role-status.enum";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { GetUserFilterDto } from "./dto/get-user-filter.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async getUser(filterDto: GetUserFilterDto): Promise<User[]> {
        const { role, search } = filterDto
        const query = this.createQueryBuilder('user')

        if (search) {
            query.andWhere('LOWER(user.name) LIKE LOWER(:search)', { search: `%${search}%` })
        }
        if (role) {
            query.andWhere('user.role = :role', { role })
        }

        const user = await query.getMany()
        return user
    }


    async createUser(createUserDto: CreateUserDto, file: any): Promise<void> {
        const { password } = createUserDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({
            ...createUserDto,
            password: hashedPassword,
            gender: GenderStatus.UNDEFINE,
            role: RoleStatus.USER,
            verify: false,
            avatar: file.path
        })
        try {
            await this.save(user)
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('email already use')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}