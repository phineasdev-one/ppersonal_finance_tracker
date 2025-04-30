import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import typeOrmConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyFinanceModule } from './modules/monthly-finance/monthly-finance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    MonthlyFinanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
