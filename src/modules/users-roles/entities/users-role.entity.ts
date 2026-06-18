import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { User } from "../../users/entities/user.entity";

@Entity('users_roles')
export class UsersRole {

  @PrimaryGeneratedColumn()
  serial!: number;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
  name: 'user_id',     
    referencedColumnName: 'id',
  })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
       name: 'role_id',  
    referencedColumnName: 'roleid',
  })
  role!: Role;
}