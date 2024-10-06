import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/createproductos.dto';
import { UpdateProductDto } from './dto/updateproductos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/producto.entity';
import { In, Repository } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categorias/entities/categoria.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { tags, categories, ...productData } = createProductDto;

    let tagEntities = [];
    let categoryEntities = [];
    if (tags && tags.length) {
      tagEntities = await this.tagRepository.find({
        where: { name: In(tags) },
      });
    }
    if (categories && categories.length) {
      categoryEntities = await this.categoryRepository.find({
        where: { name: In(categories) },
      });
    }

    const product = this.productRepository.create({
      ...productData,
      tags: tagEntities,
      categories: categoryEntities,
    });

    await this.productRepository.save(product);

    return product;
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['tags', 'categories'] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['tags', 'categories'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { tags, categories, ...productData } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...productData,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (tags && tags.length) {
      product.tags = await this.tagRepository.find({
        where: { name: In(tags) },
      });
    }
    if (categories && categories.length) {
      product.categories = await this.categoryRepository.find({
        where: { name: In(categories) },
      });
    }

    await this.productRepository.save(product);
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
  }

  async deleteAll(): Promise<void> {
    await this.productRepository.clear();
  }
}
