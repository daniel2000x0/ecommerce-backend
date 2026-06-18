import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { CreateUsersRoleDto } from './dto/create-users-role.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Post()
  create(@Body() createUsersRoleDto: CreateUsersRoleDto) {
    return this.usersRolesService.create(createUsersRoleDto);
  }

  @Get()
  findAll() {
    return this.usersRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersRoleDto: UpdateUsersRoleDto) {
    return this.usersRolesService.update(+id, updateUsersRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersRolesService.remove(+id);
  }
}
