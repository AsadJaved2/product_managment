import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Category } from '../category/category.entity';  // If the product is linked to categories

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],  // Register the Product and Category entities
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
