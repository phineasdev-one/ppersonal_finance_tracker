import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CategoryModule } from '../category/category.module';
import { MonthlyFinanceModule } from '../monthly-finance/monthly-finance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    CategoryModule,
    MonthlyFinanceModule,
  ],
  providers: [TransactionService],
  exports: [TypeOrmModule],
  controllers: [TransactionController],
})
export class TransactionModule {}
