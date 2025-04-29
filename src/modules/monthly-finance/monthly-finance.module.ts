import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyFinance } from './entities/monthlyFinance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyFinance])],
  providers: [],
  exports: [TypeOrmModule],
})
export class MonthlyFinanceModule {}
