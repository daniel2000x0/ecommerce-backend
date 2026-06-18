import { IsEnum, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "../../../common/enums/paymentMethod";
import { PaymentProvider } from "../../../common/enums/paymentProvider";
import { PaymentStatus } from "../../../common/enums/paymentStatus";
import { Order } from "../../orders/entities/order.entity";

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order ,(order)=> order.id,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column('decimal')
  amount!: number;

  @Column({ default: 'USD' })
  currency!: string;

  @Column({ nullable: true })
  provider!: string;

   @IsEnum(PaymentStatus)
   @Column({ nullable: true })
  status!: string;

  @Column()
  transaction_id!: string;
  @IsEnum(PaymentMethod)
  method!: PaymentMethod;
}