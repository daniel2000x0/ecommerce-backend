import { Column, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersRole } from "../../users-roles/entities/users-role.entity";
import { Product } from "../../products/entities/product.entity";
import { UserStatusEnum } from "../../../common/enums/user-status.enum";

@Entity('users')
export class User {
   @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  firstname!: string;

  @Column({ nullable: true })
  lastname!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ type: 'date', nullable: true })
  birthdate!: Date;

  @Column({ nullable: true })
  gender_id!: number;

@Column({
  type: 'boolean',
  default: true,
  transformer: {
    to: (value: UserStatusEnum) => value === UserStatusEnum.ACTIVE,
    from: (value: boolean) => value ? UserStatusEnum.ACTIVE : UserStatusEnum.INACTIVE,
  },
})
status!: UserStatusEnum;

@Column({
  name: 'is_verified',
  default: false,
})
isVerified!: boolean;
  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];
    @OneToMany(() => UsersRole, (userRole) => userRole.user,{

        cascade: false,
  eager: false,
    })
  userRoles!: UsersRole[];
}
      