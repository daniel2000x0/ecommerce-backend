import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersRole } from "../../users-roles/entities/users-role.entity";
@Entity('roles')
export class Role {

  @PrimaryGeneratedColumn()
  roleid!: number;

  @Column({ type: 'varchar', length: 200 })
  rolename!: string;

  // 🔗 RELACIÓN CON USERS_ROLES
  @OneToMany(() => UsersRole, (userRole) => userRole.role)
  userRoles!: UsersRole[];
}