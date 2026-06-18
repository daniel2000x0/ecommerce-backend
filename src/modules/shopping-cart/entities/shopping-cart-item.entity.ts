import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { ShoppingCart } from './shopping-cart.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('shopping_cart_items')
export class ShoppingCartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ShoppingCart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart!: ShoppingCart;

 @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productid' })
  product!: Product;
  @Column({ default: 1 })
  quantity!: number;
}