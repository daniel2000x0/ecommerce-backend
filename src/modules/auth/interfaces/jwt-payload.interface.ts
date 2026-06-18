
import { RoleEnum } from "../../../common/enums/rol.enum";
import { Scope } from "../constants/scopes-enum";


export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  type: 'user' | 'customer';
  roles: RoleEnum[];
  scope: Scope[];
  client_id: string;
}