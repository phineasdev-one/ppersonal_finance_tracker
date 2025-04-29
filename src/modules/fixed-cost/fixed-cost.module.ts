import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixedCost } from './entities/fixedCost.entity';
import { MonthlyFixedCost } from './entities/monthlyFixedCost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FixedCost, MonthlyFixedCost])],
  providers: [],
  exports: [TypeOrmModule],
})
export class FixedCostModule {}
