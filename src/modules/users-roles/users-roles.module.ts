import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesController } from './users-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from './entities/users-role.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([UsersRole]),],
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
})
export class UsersRolesModule {}
