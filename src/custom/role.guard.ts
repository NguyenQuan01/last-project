import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role_Key } from './role.decorato';
import { RoleStatus } from '../user/status/role-status.enum';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<RoleStatus[]>(Role_Key, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) return true;

        const roleUser = context.switchToHttp().getRequest().user.role;

        if (roles.includes(roleUser)) return true;

        return false;
    }
}