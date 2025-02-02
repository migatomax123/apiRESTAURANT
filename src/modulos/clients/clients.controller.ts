import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ClientsService } from './clients.service';
  import { CreateClientDto } from './dto/createcliente.dto';
  import { UpdateClientDto } from './dto/updatecliente.dto';
  
  @Controller('clients')
  export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
  
    @Post()
    create(@Body() createClientDto: CreateClientDto) {
      return this.clientsService.create(createClientDto);
    }
  
    @Get()
    findAll() {
      return this.clientsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.clientsService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
      return this.clientsService.update(id, updateClientDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.clientsService.remove(id);
    }
  }
  