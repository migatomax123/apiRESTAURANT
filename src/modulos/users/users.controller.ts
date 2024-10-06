import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './users.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuariosService) {}

  // @Post()
  // create(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   return this.usuarioService.create(createUsuarioDto);
  // }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string) {
  //   return this.usuarioService.update(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}