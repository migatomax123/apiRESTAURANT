import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Rol } from './rol.entity';
  
  @Entity({
    name: 'USUARIOS',
  })
  export class Usuario {
    @PrimaryGeneratedColumn('uuid', {
      name: 'id',
    })
    id: string;
  
    @Column('varchar', {
      name: 'username',
      nullable: false,
      unique: true,
      length: 150,
    })
    username: string;
  
    @Column('text', {
      array: true,
      //dto -> ['invitado', 'usuario', 'gestor', 'administrador']
      default: ['usuario'],
    })
    role: string[];
  
    @Column('bool', {
      default: true,
    })
    isActive: boolean;
  
    @Column('varchar', {
      name: 'avatar',
      nullable: true,
      unique: false,
      length: 150,
    })
    avatar: string; //ruta relativa a "public/images"
  
    @Column('text', {
      name: 'email',
      nullable: false,
      unique: true,
      //length: 255
    })
    email: string;
  
    @Column('varchar', {
      name: 'password',
      nullable: false,
      unique: false,
      length: 255,
    })
    password: string;
  
    @CreateDateColumn({
      name: 'create_at',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: 'update_at',
    })
    updatedAt: Date;
  
    @ManyToOne(() => Rol, (rol) => rol.user)
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;
  }