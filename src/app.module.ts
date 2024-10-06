import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modulos/auth/auth.module';
import { JwtStrategy } from './modulos/auth/strategies/jwt-strategy/jwt-strategy';
import { UsuariosModule } from './modulos/users/users.module';
import { MenuModule } from './modulos/menu/menu.module';
import { ClientsModule } from './modulos/clients/clients.module';
import { CategoriesModule } from './modulos/categorias/categorias.module';
import { ProductsModule } from './modulos/products/products.module';
import { TagsModule } from './modulos/tags/tags.module';
import { SeedsModule } from './modulos/seeds/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UsuariosModule,
    MenuModule,
    ClientsModule,
    CategoriesModule,
    ProductsModule,
    TagsModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
