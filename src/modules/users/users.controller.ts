import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleEnum } from '../../common/enums/rol.enum';
import { RolesAddDto } from './dto/roles-add.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have permission to access this resource' })
  find() {
    return this.usersService.findAll();
  }

  @Roles(RoleEnum.ADMIN)
  @Get(':email')
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have permission to access this resource' })
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have permission to access this resource' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Post('rolesAsignados')
  @ApiResponse({ status: 200, description: 'Roles assigned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - You do not have permission to access this resource' })
  async assignRolesToUser(@Body() rolesAddDto: RolesAddDto) {
    const result = await this.usersService.roles(rolesAddDto);
    this.logger.log(`Roles assigned to user ${rolesAddDto.userid}`);
    return result;
  }
}
