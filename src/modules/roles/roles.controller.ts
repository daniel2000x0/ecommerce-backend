import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEnum } from '../../common/enums/rol.enum';
import { Roles } from '../../common/decorators/roles.decorator';


@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

@Roles(RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
  @Roles(RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
  @Roles(RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
