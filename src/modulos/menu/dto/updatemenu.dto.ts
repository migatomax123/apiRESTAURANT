// src/modulos/menu/dto/update-menu.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './createmenu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
