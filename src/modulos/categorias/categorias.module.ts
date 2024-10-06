import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categorias.service';
import { CategoriesController } from './caregorias.controller';
import { Category } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService], // Exporta CategoriesService
})
export class CategoriesModule {}
