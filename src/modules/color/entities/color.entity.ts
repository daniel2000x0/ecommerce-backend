import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: '#FFFFFF' })
  code!: string;
}