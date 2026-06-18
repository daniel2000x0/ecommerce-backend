import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";
import { Country } from "../../country/entities/country.entity";
import { OrderDetail } from "../../orders-details/entities/orders-detail.entity";
import { OrderStatus } from "../enum/order.enum";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, (c) => c.orders)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column()
  country_id!: number;

  @Column()
  city!: string;

  @Column()
  region!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  total!: number;
  @Column({
  type: 'enum',
  enum: OrderStatus,
  default: OrderStatus.PENDING,
})
status!: OrderStatus;

  @OneToMany(() => OrderDetail, (detail) => detail.order)
  details!: OrderDetail[];
}