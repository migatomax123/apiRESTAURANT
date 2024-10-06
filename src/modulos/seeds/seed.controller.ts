import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedsService) {}

  @Post()
  async loadData() {
    return this.seedService.loadData();
  }
}
