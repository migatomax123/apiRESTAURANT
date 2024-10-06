import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/createtags.dto";
import { UpdateTagDto } from "./dto/updatetags.dto";
import { Tag } from "./entities/tag.entity";
import slugify from "slugify";

@Injectable()
export class TagsService {
  deleteAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async create(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    const slug = slugify(name, { lower: true, strict: true });

    const tag = this.tagRepository.create({
      name,
      slug,
    });

    await this.tagRepository.save(tag);
    return tag;
  }

  findAll() {
    return this.tagRepository.find();
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const { name } = updateTagDto;

    const tag = await this.tagRepository.preload({
      id,
      name,
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return this.tagRepository.save(tag);
  }

  async remove(id: string) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return this.tagRepository.remove(tag);
  }
  async deleteAllTag() {
    await this.tagRepository.clear();
  }
}