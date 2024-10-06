import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  slug: string;

  @IsArray({ always: true })
  @IsString({ each: true })
  @IsOptional()
  products: string[];
}