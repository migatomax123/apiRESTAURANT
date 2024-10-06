import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/createmenu.dto';
import { UpdateMenuDto } from './dto/updatemenu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const { name, price, image } = createMenuDto;

    const menu = this.menuRepository.create({
      name,
      price,
      image,
    });

    await this.menuRepository.save(menu);

    return menu;
  }

  findAll() {
    return this.menuRepository.find();
  }

  async findOne(id: string) {
    const menu = await this.menuRepository.findOneBy({id});

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.preload({
      id,
      ...updateMenuDto,
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.menuRepository.save(menu);
  }

  async remove(id: string) {
    const menu = await this.menuRepository.findOneBy({id});

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.menuRepository.remove(menu);
  }

  async deleteAll(): Promise<void> {
    await this.menuRepository.clear();
  }
}
