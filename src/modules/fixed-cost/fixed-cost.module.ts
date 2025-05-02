import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixedCost } from './entities/fixedCost.entity';
import { MonthlyFixedCost } from './entities/monthlyFixedCost.entity';
import { FixedCostService } from './fixed-cost.service';
import { FixedCostController } from './fixed-cost.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FixedCost, MonthlyFixedCost]), UsersModule],
  providers: [FixedCostService],
  exports: [TypeOrmModule],
  controllers: [FixedCostController],
})
export class FixedCostModule {}
