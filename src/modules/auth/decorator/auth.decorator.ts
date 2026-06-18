import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleEnum } from '../../../common/enums/rol.enum';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
export  const OAUTH_ROLES_KEY ='oauth-roles';
export const IS_PUBLIC_KEY = 'isPublic';
export const OAUTH_SCOPES_KEY ='oauth-scopes';
// //decorator roles OAuth2
export const  OAuthRoles = (...roles: RoleEnum[])=>
     SetMetadata(OAUTH_ROLES_KEY, roles);

//decorator  endpints  publics 
  export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
  export  const  OAuthScopes = (...scopes: string[])=>
       SetMetadata(OAUTH_SCOPES_KEY, scopes);

export function  OAuthsAuth  (roles?:RoleEnum[]){
    if(roles && roles.length > 0 ){
        return applyDecorators(
            OAuthRoles(...roles),
            UseGuards(JwtGuard, RolesGuard)
        );
    }
    return applyDecorators(UseGuards(JwtGuard))
}
export function Auth(role: RoleEnum[]) {
  return applyDecorators(Roles(...role), UseGuards(JwtGuard, RolesGuard));
}
