import { Module } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { UsuarioController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { RolRepository } from './entities/rol.repository';
import { Usuario } from './entities/users.entity';
import { UsuarioRepository } from './entities/users.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuario, UsuarioRepository, Rol, RolRepository]),
  ],

  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}