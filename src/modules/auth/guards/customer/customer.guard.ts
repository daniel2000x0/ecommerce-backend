import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
const   request  =  context.switchToHttp().getRequest();

const  user =  request.user;

    return user?.type === 'customer';
  }
}
