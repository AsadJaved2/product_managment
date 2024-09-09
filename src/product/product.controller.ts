import { Controller, Post, UseGuards, Body, Req, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
    return this.productService.createProduct(createProductDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() createProductDto: CreateProductDto, @Req() req) {
    return this.productService.updateProduct(id, createProductDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: number, @Req() req) {
    return this.productService.deleteProduct(id, req.user);
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}
