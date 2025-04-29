import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryBudget } from './entities/categoryBudget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryBudget])],
  providers: [],
  exports: [TypeOrmModule],
})
export class CategoryBudgetModule {}
