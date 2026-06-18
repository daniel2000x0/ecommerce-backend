import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/categories.entity";
import { Manufacture } from "../../manufactures/entities/manufactures.entity";

import { ShoppingCartItem } from "../../shopping-cart/entities/shopping-cart-item.entity";
import { ProductImage } from "../../product-image/entities/product-image.entity";
import { ProductColor } from "../../product-color/entities/product-color.entity";
import { ProductSize } from "../../product-size/entities/product-size.entity";
import { OrderDetail } from "../../orders-details/entities/orders-detail.entity";
import { ShoppingCart } from "../../shopping-cart/entities/shopping-cart.entity";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  sku!: string;

  @Column()
  name!: string;

  @Column('decimal', { precision: 9, scale: 2, default: 0 })
  price!: number;

  @Column({ default: 0 })
  discount!: number;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => Manufacture, (m) => m.products)
  @JoinColumn({ name: 'manufacture_id' })
  manufacture!: Manufacture;

  @ManyToOne(() => Category, (c) => c.products)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => User, (u) => u.products)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: 0 })
  views!: number;

  @OneToMany(() => ProductImage, (img) => img.product)
  images!: ProductImage[];

  @OneToMany(() => ProductColor, (pc) => pc.product)
  colors!: ProductColor[];

  @OneToMany(() => ProductSize, (ps) => ps.product)
  sizes!: ProductSize[];

  @OneToMany(() => ShoppingCartItem, (item) => item.product)
  cartItems!: ShoppingCartItem[];

  @OneToMany(() => OrderDetail, (detail) => detail.product)
  orderDetails!: OrderDetail[];
}