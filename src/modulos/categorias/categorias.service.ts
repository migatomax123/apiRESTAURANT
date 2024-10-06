import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createcategorias.dto';
import { UpdateCategoryDto } from './dto/updatecategorias.dto';
import { Category } from './entities/categoria.entity';

import slugify from 'slugify';

@Injectable()
export class CategoriesService  {
  deleteAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const slug = slugify(name, { lower: true, strict: true });

    const category = this.categoryRepository.create({
      name,
      slug,
    });

    await this.categoryRepository.save(category);

    return category;
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({id});

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;
    const slug = slugify(name, { lower: true, strict: true });

    const category = await this.categoryRepository.preload({
      id,
      name,
      slug,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOneBy({id});

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.categoryRepository.remove(category);
  }
  async deleteAllCategory() {
    await this.categoryRepository.clear();
  }
}