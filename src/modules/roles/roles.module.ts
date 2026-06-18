import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from '../users-roles/entities/users-role.entity';
import { Role } from './entities/role.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Role, UsersRole]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
    exports: [RolesService,  TypeOrmModule],
})
export class RolesModule {}
