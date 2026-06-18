import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { Category } from "../../categories/entities/categories.entity";

@Entity('categories_kinds')
export class CategoryKind {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}