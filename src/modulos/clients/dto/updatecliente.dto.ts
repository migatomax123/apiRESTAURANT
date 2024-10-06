import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './createcliente.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}