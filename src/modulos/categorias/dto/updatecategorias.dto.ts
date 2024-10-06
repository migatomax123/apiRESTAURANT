import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './createcategorias.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}