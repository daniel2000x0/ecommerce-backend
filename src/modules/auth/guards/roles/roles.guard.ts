import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEnum } from '../../../../common/enums/rol.enum';
import { ROLES_KEY } from '../../../../common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private readonly reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const rolest =  this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [context.getHandler(),  context.getClass()])
    if (!rolest || rolest.length === 0 ){
   return false;
    } 

    const {user}= context.switchToHttp().getRequest();

    if(!user || user.length ===0){
   throw new ForbiddenException('User authentication required')
    }

    const userRoles = this.extractRolesIds(user.roles);

    const  hasroles = rolest.some(
      (role)=>{userRoles.includes(role)}
    )

    if(!hasroles){
  throw   new   ForbiddenException('Denegated  Access')
    }
    return true;

    
  }

  private extractRolesIds (roles : any[]): RoleEnum[]{
    
 return roles.map((role)=> {
  if(typeof role ===  'object'){
   return role.roleid||role.id|| role.name;
  }
  return role

 })
  }
}
