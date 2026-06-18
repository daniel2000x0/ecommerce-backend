import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRole } from '../users-roles/entities/users-role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, UsersRole]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
