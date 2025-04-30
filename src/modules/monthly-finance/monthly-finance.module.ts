import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyFinance } from './entities/monthlyFinance.entity';
import { MonthlyFinanceController } from './monthly-finance.controller';
import { MonthlyFinanceService } from './monthly-finance.service';
import { IncomeModule } from '../income/income.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyFinance]), IncomeModule],
  providers: [MonthlyFinanceService],
  exports: [TypeOrmModule],
  controllers: [MonthlyFinanceController],
})
export class MonthlyFinanceModule {}
