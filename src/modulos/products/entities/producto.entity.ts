import { Category } from "src/modulos/categorias/entities/categoria.entity";
import { Tag } from "src/modulos/tags/entities/tag.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;


    @Column({ type: "float" })
    price: number;

    @Column({ type: "integer" })
    rating: number;

    @Column({ default: 'primary' })
    color: string;


    @JoinTable()
    @ManyToMany(() => Category, (category) => category.products, { eager: true })
    categories: Category[];
    
    @JoinTable()
    @ManyToMany(() => Tag, (tag) => tag.products, { eager: true })
    tags: Tag[];
}