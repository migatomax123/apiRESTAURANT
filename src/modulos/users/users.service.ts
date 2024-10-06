import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  findAll() {
    const usuarios = this.usuariosRepository.find();
    return usuarios;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}