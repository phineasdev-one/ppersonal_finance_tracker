import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyFinanceController } from './monthly-finance.controller';

describe('MonthlyFinanceController', () => {
  let controller: MonthlyFinanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyFinanceController],
    }).compile();

    controller = module.get<MonthlyFinanceController>(MonthlyFinanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
