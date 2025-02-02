import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Usuario } from './users.entity';

@Injectable()
export class UsuarioRepository extends Repository<Usuario> {
  constructor(private datasource: DataSource) {
    super(Usuario, datasource.createEntityManager());
  }

  async findByEmail(email1: string) {
    try {
      return await this.createQueryBuilder('USERS')
        .where(`email = :value`, { value: email1 })
        .getOne();
      /*
                    select * 
                    from USERS
                    where email = $email1
                    limit = 1
                */
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el email');
    }
  }
  async findByUsername(username: string) {
    try {
      return await this.createQueryBuilder('USERS')
        .where(`username = :value`, { value: username })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el email');
    }
  }
}