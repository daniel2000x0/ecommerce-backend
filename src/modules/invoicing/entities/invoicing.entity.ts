import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";


@Entity('invoices')
export class Invoice {

   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   accessKey!: string;

   @Column()
   authorizationNumber!: string;

   @Column()
   sequential!: string;

   @Column()
   sriStatus!: string;

   @Column()
   environment!: string;

   @Column()
   xmlPath!: string;

   @Column()
   pdfPath!: string;

   @Column()
   subtotal!: number;

   @Column()
   iva!: number;

   @Column()
   total!: number;

   @ManyToOne(() => Order)
   order!: Order;
}