import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import {  CategoryKind } from "../../categories-kind/entities/categories-kind.entity";

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => CategoryKind)
  @JoinColumn({ name: 'category_kind_id' })
  categoryKind!: CategoryKind;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}