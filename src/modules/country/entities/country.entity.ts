import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity('countries')
export class Country{

  @PrimaryGeneratedColumn()
  serial!: number;

  @Column({unique:  true})
  countryid!: number;

  @Column({ type: 'uuid', unique: true })
  countrycode!: string;

  @Column({ name: 'countrycodealpha2' })
  countrycodealpha2!: string;

  @Column({ name: 'countrycodealpha3' })
  countrycodealpha3!: string;

  @Column({ name: 'countrynameen' })
  countrynameen!: string;

  @Column({ name: 'countrynamear' })
  countrynamear!: string;

    @OneToMany(()=> Order, (order)=> order.country_id)
    orders!: Order[];
}