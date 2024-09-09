import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'asad12345',
      database: 'product_management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
