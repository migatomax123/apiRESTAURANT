import { Product } from "src/modulos/products/entities/producto.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tags" })
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];
}