import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRole } from '../users-roles/entities/users-role.entity';
import { DataSource, Repository } from 'typeorm';
import { RoleEnum } from '../../common/enums/rol.enum';
import { UserRole } from './interface/role-interface';

@Injectable()
export class RolesService {

  constructor(
      @InjectRepository(UsersRole)
  private readonly userrolerepository: Repository<UsersRole>,
  private datasource : DataSource,
  ){}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

async findOne(userId: number): Promise<UserRole[]> {
  const resultado = await this.userrolerepository.find({
    where: {
      user: { id: userId },
    },
    relations: ['role'],
  });

  return resultado.map((r) => ({
    roleId: r.role.roleid as RoleEnum,
  }));
}

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
