import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "../../color/entities/color.entity";
import { Product } from "../../products/entities/product.entity";

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (p) => p.colors)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_id' })
  color!: Color;
}