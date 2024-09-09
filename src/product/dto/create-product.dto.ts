import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  categoryId: number;

  @IsArray()
  @IsOptional()
  images: string[];
}
