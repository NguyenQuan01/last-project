import { UserRepository } from 'src/user/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user..entity';
import { GenderStatus } from './status/gender-status.enum';
import { RoleStatus } from './status/role-status.enum';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { Connection } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private connection: Connection,

    ) { }

    getUser(filterDto: GetUserFilterDto): Promise<User[]> {
        return this.userRepository.getUser(filterDto);
    }

    async getUserById(id: string): Promise<User> {
        const found = await this.userRepository.findOne(id)
        if (!found) {
            throw new Error(`User id: ${id} not found`);
        }
        return found
    }

    async updateUser(id: string, genderStatus: GenderStatus, roleStatus: RoleStatus, file: any): Promise<User> {
        const user = await this.getUserById(id)
        if (fs.existsSync(user.avatar)) {
            fs.unlinkSync(`./${user.avatar}`)
        }

        user.gender = genderStatus
        user.role = roleStatus
        user.avatar = file.path
        await this.userRepository.save(user)

        return user
    }

    async delete ( id: string){
        const user = await this.userRepository.delete(id)
        if (user.affected === 0) {
            throw new NotFoundException(`order with ID "${id}" not found`);
        }
    }
}