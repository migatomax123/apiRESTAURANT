// src/modulos/menu/entities/menu.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;  // Precio del menú

  @Column({ nullable: true })
    image: string;
}
