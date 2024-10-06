import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './createtags.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}