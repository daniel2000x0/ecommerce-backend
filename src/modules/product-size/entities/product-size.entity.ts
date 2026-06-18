import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Size } from "../../size/entities/size.entity";
import { Product } from "../../products/entities/product.entity";

@Entity('product_sizes')
export class ProductSize {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (p) => p.sizes)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => Size)
  @JoinColumn({ name: 'size_id' })
  size!: Size;
}