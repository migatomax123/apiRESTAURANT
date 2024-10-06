// src/modulos/seeds/seeds.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './seed.service';
import { SeedController } from './seed.controller';
import { MenuModule } from '../menu/menu.module';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categorias/categorias.module';
import { ClientsModule } from '../clients/clients.module';
import { TagsModule } from '../tags/tags.module';
import { Menu } from '../menu/entities/menu.entity';
import { Product } from '../products/entities/producto.entity';
import { Category } from '../categorias/entities/categoria.entity';
import { Client } from '../clients/entities/client.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu, Product, Category, Client, Tag]),
    MenuModule,
    ProductsModule,
    CategoriesModule,
    ClientsModule,
    TagsModule,
  ],
  providers: [SeedsService],
  controllers: [SeedController],
})
export class SeedsModule {}

