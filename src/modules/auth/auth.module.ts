import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { CustomerModule } from '../customer/customer.module';
import { MailModule } from '../mail/mail.module';

import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalOAuthStrategy } from './strategies/oauth2.strategy';
import { BearerStrategy } from './strategies/bearer-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken';

@Module({
  imports:[ConfigModule, CustomerModule, UsersModule, RolesModule,
    MailModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
     inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
  })],
  controllers: [AuthController],
  providers: [AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,

    LocalOAuthStrategy,
    BearerStrategy,],
  exports:[ AuthService, JwtModule]
})
export class AuthModule {}
