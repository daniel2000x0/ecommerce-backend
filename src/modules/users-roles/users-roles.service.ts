import { Injectable } from '@nestjs/common';
import { CreateUsersRoleDto } from './dto/create-users-role.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';

@Injectable()
export class UsersRolesService {
  create(createUsersRoleDto: CreateUsersRoleDto) {
    return 'This action adds a new usersRole';
  }

  findAll() {
    return `This action returns all usersRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersRole`;
  }

  update(id: number, updateUsersRoleDto: UpdateUsersRoleDto) {
    return `This action updates a #${id} usersRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersRole`;
  }
}
