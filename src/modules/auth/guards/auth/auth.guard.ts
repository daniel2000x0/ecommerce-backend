import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService : JwtService,
    private readonly configService : ConfigService,
    private readonly authService : AuthService,
  ){}
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const  request =  context.switchToHttp().getRequest();
    const token =  this.extractTokenFromHeader(request);
    if(!token)
    {
      throw new UnauthorizedException();

    }

    try {
       const  payload =  await this.jwtService.verifyAsync(token,{
        secret: process.env.JWT_SECRET,
       });
       request['user']=  payload;

    } catch (error) {
      this.logger.error('Token verification failed', error);
      if(error instanceof Error){  throw new UnauthorizedException (error.message|| 'Authentication failed');}
      throw new UnauthorizedException('Authentication  failed')
      
    }
    return true;
  }

  private extractTokenFromHeader (request: Request):string| undefined{
  const authHeader =  request.headers.authorization;
  if(!authHeader){
    return  request.query?.token as string;
  }
  const [type , token] = request.headers.authorization?.split(' ') ?? [];
   return type === 'Bearer' ? token : undefined;
  }
}
