import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../../gender/entities/gender.entity";
import { ShoppingCart } from "../../shopping-cart/entities/shopping-cart.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
@Column({
  name: 'is_verified',
  default: false,
})
isVerified!: boolean;

  @Column({ type: 'date' })
  birthdate!: Date;

  @ManyToOne(() => Gender, (gender) => gender.customers)
  @JoinColumn({ name: 'customergender', referencedColumnName: 'genderid' })
  gender!: Gender;

  @OneToMany(() => ShoppingCart, (cart) => cart.customer)
  carts!: ShoppingCart[];

  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];
}