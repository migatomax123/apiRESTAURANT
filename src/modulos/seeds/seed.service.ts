import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MenuService } from '../menu/menu.service';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categorias/categorias.service';
import { ClientsService } from '../clients/clients.service';
import { TagsService } from '../tags/tags.service';
import * as seedMenus from './data/menu.json';
import * as seedProducts from './data/productos.json';
import * as seedCategories from './data/categorias.json';
import * as seedClients from './data/clients.json';
import * as seedTags from './data/tags.json';
import { CreateMenuDto } from '../menu/dto/createmenu.dto';
import { CreateProductDto } from '../products/dto/createproductos.dto';
import { CreateCategoryDto } from '../categorias/dto/createcategorias.dto';
import { CreateClientDto } from '../clients/dto/createcliente.dto';
import { CreateTagDto } from '../tags/dto/createtags.dto';

@Injectable()
export class SeedsService {
  constructor(
    private readonly menuService: MenuService,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly clientsService: ClientsService,
    private readonly tagsService: TagsService,
  ) {}

  public async loadData(): Promise<void> {
    await this.insertData();
  }

  private async insertData(): Promise<void> {
    try {
      await this.insertMenus();
      await this.insertProducts();
      await this.insertCategories();
      await this.insertClients();
      await this.insertTags();
    } catch (error) {
      throw new InternalServerErrorException(
        'Póngase en contacto con el Sysadmin',
      );
    }
  }

  private async insertMenus(): Promise<void> {
    const insertPromises = seedMenus.map((menu: CreateMenuDto) => 
      this.menuService.create(menu)
    );
    await Promise.all(insertPromises);
  }

  private async insertProducts(): Promise<void> {
    const insertPromises = seedProducts.map((product: CreateProductDto) => 
      this.productsService.create(product)
    );
    await Promise.all(insertPromises);
  }

  private async insertCategories(): Promise<void> {
    const insertPromises = seedCategories.map((category: CreateCategoryDto) => 
      this.categoriesService.create(category)
    );
    await Promise.all(insertPromises);
  }

  private async insertClients(): Promise<void> {
    const insertPromises = seedClients.map((client: CreateClientDto) => 
      this.clientsService.create(client)
    );
    await Promise.all(insertPromises);
  }

  private async insertTags(): Promise<void> {
    const insertPromises = seedTags.map((tag: CreateTagDto) => 
      this.tagsService.create(tag)
    );
    await Promise.all(insertPromises);
  }
}
