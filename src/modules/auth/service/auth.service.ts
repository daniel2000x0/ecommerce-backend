import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { CustomerService } from '../../customer/customer.service';
import { RolesService } from '../../roles/roles.service';
import { ConfigService } from '@nestjs/config';
import { AuthEntityMapper } from '../mappers/auth-entity.mapper';
import { AuthEntity } from '../interfaces/auth-entity.interface';
import { RoleEnum } from '../../../common/enums/rol.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Scope } from '../constants/scopes-enum';
import { LoginUserDto } from '../dto/login.dto';
import { User } from '../../users/entities/user.entity';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';

import * as bcrypt from 'bcrypt';
import { EmailTokenVerification } from '../interfaces/email-token-verificarin.interface';
import { MailService } from '../../mail/mail.service';
import { DataSource } from 'typeorm';
import { UpdateCustomerDto } from '../../customer/dto/update-customer.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private  readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly customerService: CustomerService,
    private jwtService: JwtService,
    private readonly rol_user: RolesService,
    private configService: ConfigService,
    private  mailService :  MailService
  ) {}


  async  register ( register: CreateCustomerDto){
  try {
    const hashedpassword =  await bcrypt.hash(register.password,10);

    const validation =  await this.customerService.findemail(register.email);

    if(validation){
      throw new HttpException('Email already in use', 409);
    }
     const newCustomer =  await  this.customerService.create(
      {
        ...register,
        password: hashedpassword
      }
     ); 
     const verificationtoken : EmailTokenVerification = {
sub: newCustomer.id,
email: newCustomer.email,
type: 'EmailVerification'
     }
      const token =  this.generateTokenEmailVerificationToken(verificationtoken);
      const url = `${this.configService.get<string>('FRONTEND_URL')}/verify-email?token=${token}`;
     const  send =  await this.mailService.vericationRegisterEmail('Ecommerce App', newCustomer.email, url);
     if(send){
     return {
      message: 'Verification email sent successfully',
      user: newCustomer.email,
     } }else {
      return {
        message: 'Failed to send verification email',
        user: newCustomer.email
      }
     }
  } catch (error) {
     throw new HttpException('Error registering user', 500); 
  }
     

 }


 async validateUser(username: string, password: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneWithUserName(username);
    const customer = await this.customerService.findemail(username);

    if (!customer && !user) {
      throw new HttpException('USER_INVALID', 403);
    }
  if (user) {
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return AuthEntityMapper.fromUser(user);
    }
    if (customer) {
      const checkPassword = await compare(password, customer.password);
      if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = customer;
      return AuthEntityMapper.fromCustomer(customer);
    }
    throw new HttpException('USER_INVALID', 403);
  }

  private async issueTokens(entity: AuthEntity, client_id: string) {
    if (entity.type === 'user') {
      const userRoles = await this.rol_user.findOne(entity.id);
      if (!userRoles) {
        throw new NotFoundException('ROLES NO ENCONTRADOS');
      } else {
        const roles: RoleEnum[] = userRoles.map((role) => role.roleId);
        const payload: JwtPayload = {
          sub: entity.id,
          email: entity.email,
          name: entity.name,
          roles,
          type: 'user',
          scope: this.getUserScopes(roles),
          client_id,
        };
        return this.generateTokens(payload);
      }
    }

    const payload: JwtPayload = {
      sub: entity.id,
      type: 'customer',
      email: entity.email,
      name: entity.name,
      roles: [RoleEnum.CUSTOMER],
      scope: [Scope.CUSTOMER],
      client_id,
    };
    return this.generateTokens(payload);
  }

  private generateTokens(payload: JwtPayload) {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    const expires_in = this.calculateExpiresIn(
      this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    );

    return { access_token, refresh_token, expires_in };
  }

   async  generateTokenEmailVerificationToken(payload : EmailTokenVerification) {
    return  await this.jwtService.signAsync({sub: payload.sub, email: payload.email, type: payload.type}, {
 secret: this.configService.get<string>('JWT_SECRET'),
expiresIn: this.configService.get('JWT_EMAIL_VERIFICATION_EXPIRES_IN', '24h'),
    })
  }

  async login(user: LoginUserDto) {
    const { userpassword, useremail } = user;
    const userv = await this.validateUser(useremail, userpassword);
    const client_id = this.configService.getOrThrow<string>('OAUTH_CLIENT_ID');
    const tokens = await this.issueTokens(userv, client_id);
    return {
      ...tokens,
      token_type: 'bearer',
      user: {
        id: userv.id,
        email: userv.email,
        name: userv.name,
        type: userv.type,
      },
    };
  }

  getUserScopes(roles: RoleEnum[]): Scope[] {
    if (roles.includes(RoleEnum.ADMIN)) return [Scope.ADMIN];
    if (roles.includes(RoleEnum.MANAGER)) return [Scope.MANAGER];

    return [Scope.GUEST];
  }

  async oauth2Token(
    grant_type: string,
    username?: string,
    password?: string,
    refresh_token?: string,
    client_id?: string,
    client_secret?: string,
  ) {
    if (!client_id || !client_secret) {
      throw new UnauthorizedException('CLIENT_CREDENTIALS_REQUIRED');
    }
    const isValidClient = await this.validateClient(client_id, client_secret);
    if (!isValidClient) {
      throw new UnauthorizedException('INVALID_CLIENT_CREDENTIALS');
    }

    // 2️⃣ Resolver según grant_type
    switch (grant_type) {
      case 'password':
        if (!username || !password) {
          throw new UnauthorizedException('INVALID_CREDENTIALS');
        }
        return this.passwordGrant(username, password, client_id);

      case 'refresh_token':
        if (!refresh_token) {
          throw new UnauthorizedException('REFRESH_TOKEN_REQUIRED');
        }
        return this.refreshTokenGrant(refresh_token, client_id);

      case 'client_credentials':
        return this.handleClientCredentialsGrant(client_id);

      default:
        throw new UnauthorizedException('UNSUPPORTED_GRANT_TYPE');
    }
  }

  private async passwordGrant(
    username: string,
    password: string,
    client_id: string,
  ) {
    const entity = await this.validateUser(username, password);

    const { access_token, refresh_token, expires_in } = await this.issueTokens(
      entity,
      client_id,
    );

    let scope: string[] = [];

    if (entity.type === 'user') {
      const roles = await this.rol_user.findOne(entity.id);
      const roleEnums: RoleEnum[] = roles.map((r) => r.roleId);
      scope = this.getUserScopes(roleEnums);
    } else {
      scope = ['customer'];
    }

    return {
      access_token,
      refresh_token,
      token_type: 'bearer',
      expires_in,
      scope,
      user: {
        id: entity.id,
        email: entity.email,
        name: entity.name,
        type: entity.type,
      },
    };
  }

  private async refreshTokenGrant(refresh_token: string, client_id: string) {
    try {
      // Verificar refresh token (YA IMPLEMENTADO)
      const payload = await this.verifyRefreshToken(refresh_token);
      let entity: AuthEntity;

      if (payload.type === 'user') {
        const user = await this.usersService.finId(payload.sub);
        if (!user) {
          throw new UnauthorizedException('USER_NOT_FOUND');
        }
        entity = AuthEntityMapper.fromUser(user);
      } else if (payload.type === 'customer') {
        const customer = await this.customerService.findOne(payload.sub);
        if (!customer) {
          throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
        }
        entity = AuthEntityMapper.fromCustomer(customer);
      } else {
        throw new UnauthorizedException('INVALID_TOKEN_TYPE');
      }

      const {
        access_token,
        refresh_token: new_refresh,
        expires_in,
      } = await this.issueTokens(entity, client_id);

      return {
        access_token,
        refresh_token: new_refresh,
        token_type: 'bearer',
        expires_in,
        scope: payload.scope,
      };
    } catch {
      throw new UnauthorizedException('INVALID_REFRESH_TOKEN');
    }
  }
  private handleClientCredentialsGrant(client_id: string) {
    const payload = {
      sub: client_id,
      client_id: client_id,
      grant_type: 'client_credentials',
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '1h'),
    });

    return {
      access_token,
      token_type: 'bearer',
      expires_in: 3600,
      scope: 'api',
    };
  }

  //  metodo   para  validar   otro metodo de  validar usuario  aun que   ya se valdia dentro de la  funcion  registrar

  refreshToken(user: User) {
    const payload = { id: user.id, name: user.firstname };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d', // 7 días
      }),
    };
  }
  private calculateExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/(\d+)([smhd])/);
    if (!match) return 3600;

    const [, amount, unit] = match;
    const amountNum = parseInt(amount, 10);

    switch (unit) {
      case 's':
        return amountNum;
      case 'm':
        return amountNum * 60;
      case 'h':
        return amountNum * 3600;
      case 'd':
        return amountNum * 86400;
      default:
        return 3600;
    }
  }

  public validateClient(
    client_id: string,
    client_secret: string,
  ): Promise<boolean> {
    const validClientId = this.configService.get<string>('OAUTH_CLIENT_ID');
    const validClientSecret = this.configService.get<string>(
      'OAUTH_CLIENT_SECRET',
    );

    return Promise.resolve(
      client_id === validClientId && client_secret === validClientSecret,
    );
  }

  private sanitizeUser(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userpassword, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  private async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.finId(payload.sub);
      if (!user) return null;

      const userRoles = await this.rol_user.findOne(user.id);

      const roles: RoleEnum[] = userRoles.map((r) => r.roleId);

      return {
        ...this.sanitizeUser(user),
        roles: roles,
        client_id: payload.client_id,
        scope: payload.scope,
      };
    } catch (error) {
      this.logger.error('Error validating user by payload', error);
      return null;
    }
  }

  async validateUserByPayload(payload: JwtPayload) {
    const user = await this.usersService.finId(payload.sub);
    if (!user) return null;

    const userRoles = await this.rol_user.findOne(user.id);
    const roles: RoleEnum[] = userRoles.map((role) => role.roleId);

    return {
      ...this.sanitizeUser(user),
      roles,
      client_id: payload.client_id,
      scope: payload.scope,
    };
  }
 
 async  confirmemail (token: string ){
    try {
      const payload =  this.jwtService.verify<EmailTokenVerification>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      if(payload.type !== 'EmailVerification'){
        throw new HttpException('Invalid token type', 400);
      }
      const customer =  await this.customerService.findemail(payload.email);
      if(!customer){
        throw new NotFoundException('Customer not found');
      }
      const cosumerdto : UpdateCustomerDto = {
        isVerified: true
      }
      const updatedCustomer = await this.customerService.update(customer.id, cosumerdto);

    } catch (error) {
      throw new HttpException('Error confirming email', 500);
    }

  }



 
}
