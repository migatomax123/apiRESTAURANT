import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class  Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("numeric")
  age: number;

  @Column("varchar")
  directions: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  gender: string;

  @Column("numeric")
  phone: number;
}