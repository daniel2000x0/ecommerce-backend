import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";

@Entity('genders')
export class Gender {
    @PrimaryGeneratedColumn({ name: 'genderid' })
  genderid!: number;

  @Column({ name: 'gendername', length: 20 })
  gendername!: string;

  @OneToMany(() => Customer, (customer) => customer.gender)
  customers!: Customer[];

}