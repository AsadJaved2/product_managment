import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../auth/user.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,  // Inject Product repository
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private dataSource: DataSource,
  ) {}

  async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const { name, description, price, categoryId, images } = createProductDto;

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID "${categoryId}" not found`);
    }

    const product = this.productRepository.create({
      name,
      description,
      price,
      images,
      category,
      user,
    });

    await this.productRepository.save(product);
    return product;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category', 'user'] });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async updateProduct(id: number, createProductDto: CreateProductDto, user: User): Promise<Product> {
    const product = await this.getProductById(id);

    if (product.user.id !== user.id) {
      throw new NotFoundException(`You do not own this product`);
    }

    const { name, description, price, categoryId, images } = createProductDto;
    product.name = name;
    product.description = description;
    product.price = price;
    product.images = images || product.images;

    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new NotFoundException(`Category with ID "${categoryId}" not found`);
      }
      product.category = category;
    }

    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: number, user: User): Promise<void> {
    const product = await this.getProductById(id);

    if (product.user.id !== user.id) {
      throw new NotFoundException(`You do not own this product`);
    }

    await this.productRepository.delete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category', 'user'] });
  }
}
