import { SetMetadata } from '@nestjs/common';
import { RoleStatus } from '../user/status/role-status.enum';

export const Role_Key = process.env.KEY_ROLE;
console.log(Role_Key);

export const Roles = (...role: RoleStatus[]) => SetMetadata(Role_Key, role);