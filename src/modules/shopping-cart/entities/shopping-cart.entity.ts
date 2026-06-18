import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { Customer } from "../../customer/entities/customer.entity";
import { ShoppingCartItem } from "./shopping-cart-item.entity";

@Entity('shopping_carts')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.carts)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @OneToMany(() => ShoppingCartItem, (item) => item.cart)
  items!: ShoppingCartItem[];
}