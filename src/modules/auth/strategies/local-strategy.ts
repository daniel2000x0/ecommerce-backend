import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';

import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'useremail', 
      passwordField: 'userpassword', 
    });
  }

  async validate(useremail: string, userpassword: string) {
    const user = await this.authService.validateUser(useremail, userpassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}