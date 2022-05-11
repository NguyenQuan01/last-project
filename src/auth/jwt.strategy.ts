import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entity/user..entity";
import { UserRepository } from "src/user/user.repository";
import { JwtPayLoad } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            secretOrKey: 'abcd1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    async validate(payload: JwtPayLoad): Promise<User> {
        const { email } = payload
        const auth: User = await this.userRepository.findOne({ email })

        if (!auth) {
            throw new UnauthorizedException()
        }
        return auth
    }
}