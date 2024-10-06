import { IsNotEmpty, IsNumber, IsOptional , IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;  // Precio del menú

  @IsString()
  @IsOptional()
  image?: string;  // URL de la imagen del menú
}