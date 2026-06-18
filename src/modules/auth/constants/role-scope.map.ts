import { RoleAuthEnum } from './roles.enum';
import { Scope } from './scopes-enum';


const ROLE_SCOPE_MAP: Record<RoleAuthEnum, Scope[]> = {
  [RoleAuthEnum.ADMIN]: [Scope.ADMIN],
  [RoleAuthEnum.MANAGER]: [Scope.MANAGER],
  [RoleAuthEnum.CUSTOMER]: [Scope.CUSTOMER],
};
export default ROLE_SCOPE_MAP;