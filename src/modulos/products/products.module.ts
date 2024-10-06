import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/producto.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categorias/entities/categoria.entity';
import { TagsModule } from '../tags/tags.module';
import { CategoriesModule } from '../categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Tag, Category]), // Importar entidades para TypeORM
    TagsModule, // Importar módulo de Tags si es necesario
    CategoriesModule, // Importar módulo de Categorías si es necesario
  ],
  controllers: [ProductsController], // Registrar el controlador de productos
  providers: [ProductsService], // Registrar el servicio de productos
  exports: [ProductsService], // Exportar el servicio de productos
})
export class ProductsModule {}

