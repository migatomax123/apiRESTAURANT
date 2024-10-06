import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/createcliente.dto';
import { UpdateClientDto } from './dto/updatecliente.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  deleteAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Client)
    private readonly clienteRepository: Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clienteRepository.create(createClientDto);
      await this.clienteRepository.save(client);
      return client;
    } catch (error) {
      throw new Error('Error al crear el cliente, porfa verificar los campos');
    }
  }

  async findAll() {
    try {
      return await this.clienteRepository.find();
    } catch (error) {
      throw new Error('Error al obtener la lista de clientes');
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.clienteRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      return client;
    } catch (error) {
      throw new Error('Error al obtener el cliente');
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.findOne(id);
      const updatedClient = this.clienteRepository.merge(client, updateClientDto);
      return await this.clienteRepository.save(updatedClient);
    } catch (error) {
      throw new Error('Error al actualizar el cliente');
    }
  }

  async remove(id: string) {
    try {
      const client = await this.findOne(id);
      await this.clienteRepository.remove(client);
      return `El cliente ${client.name} se ha eliminado correctamente`;
    } catch (error) {
      throw new Error('Error al eliminar el cliente');
    }
    
  }
  async deleteAllClient() {
    await this.clienteRepository.clear();
  }
}
