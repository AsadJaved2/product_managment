import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('simple-array')
  images: string[];

  @ManyToOne(() => User, user => user.products)
  user: User;

  @ManyToOne(() => Category, category => category.products)
  category: Category;
}
