import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersRoleDto } from './create-users-role.dto';

export class UpdateUsersRoleDto extends PartialType(CreateUsersRoleDto) {}
