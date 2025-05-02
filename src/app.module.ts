import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import typeOrmConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyFinanceModule } from './modules/monthly-finance/monthly-finance.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CategoryModule } from './modules/category/category.module';
import { FixedCostModule } from './modules/fixed-cost/fixed-cost.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    FixedCostModule,
    TransactionModule,
    MonthlyFinanceModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
