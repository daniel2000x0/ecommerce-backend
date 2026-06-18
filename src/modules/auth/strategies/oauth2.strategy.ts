import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';
import { RolesService } from '../../roles/roles.service';
import { RoleEnum } from '../../../common/enums/rol.enum';


@Injectable()
export class LocalOAuthStrategy extends PassportStrategy(
  Strategy,
  'local-oauth',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(request: any, username: string, password: string) {
    try {
      const authHeader = request.headers['authorization'];
      let client_id = '';
      let client_secret = '';

      if (authHeader?.startsWith('Basic ')) {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
          'ascii',
        );
        [client_id, client_secret] = credentials.split(':');
      }

      // ✅ validateClient debe ser PUBLIC en AuthService
      const isValidClient = await this.authService.validateClient(
        client_id,
        client_secret,
      );

      if (!isValidClient) {
        throw new UnauthorizedException('Invalid client credentials');
      }

      const user = await this.authService.validateUser(username, password);

     
      if (user.type === 'user') {
        const userRoles = await this.rolesService.findOne(user.id);

        // 🔥 CAMBIO 2: usar roleId (enum), no roleid
        const roles: RoleEnum[] = userRoles.map((r) => r.roleId);
        return {
          ...user,
          client_id,
          roles,
        };
      }

      return {
        ...user,
        client_id,
        roles: [RoleEnum.CUSTOMER],
      };
    } catch (error) {
      throw new UnauthorizedException(error|| 'Authentication failed');
    }
  }
}