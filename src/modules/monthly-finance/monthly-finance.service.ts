import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthlyFinance } from './entities/monthlyFinance.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMonthlyFinanceDto } from './dtos/createMonthly.dto';
import { Income } from '../income/entities/income.entity';
import { UpdateMonthlyFinanceDto } from './dtos/update-monthly-finance.dto';

@Injectable()
export class MonthlyFinanceService {
  constructor(
    @InjectRepository(MonthlyFinance)
    private monthlyFinanceRepo: Repository<MonthlyFinance>,

    @InjectRepository(Income)
    private incomeRepo: Repository<Income>,
  ) {}

  async createMonthlyFinance(request: CreateMonthlyFinanceDto, userId: string) {
    const { month, year, incomes } = request;

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    const monthlyFinance = this.monthlyFinanceRepo.create({
      month,
      year,
      totalIncome,
      totalSpend: 0,
      user: { id: userId },
    });
    await this.monthlyFinanceRepo.save(monthlyFinance);

    const incomeEntities = incomes.map((income) =>
      this.incomeRepo.create({
        name: income.name,
        monthlyFinance,
        amount: income.amount,
      }),
    );

    await this.incomeRepo.save(incomeEntities);

    return monthlyFinance;
  }

  async getMonthlyFinance(userId: string, month: number, year: number) {
    const finance = await this.monthlyFinanceRepo.findOne({
      where: {
        user: { id: userId },
        month,
        year,
      },
      relations: [
        'incomes',
        'transactions',
        'monthlyFixedCosts',
        'monthlyFixedCosts.fixedCost',
        'categoryBudgets',
        'categoryBudgets.category',
      ],
    });

    if (!finance) {
      throw new NotFoundException(
        'Cannot find any value for this month and year',
      );
    }

    return finance;
  }

  async findOne(id: string, userId: string) {
    const finance = await this.monthlyFinanceRepo.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: [
        'incomes',
        'transactions',
        'monthlyFixedCosts',
        'monthlyFixedCosts.fixedCost',
        'categoryBudgets',
        'categoryBudgets.category',
      ],
    });

    if (!finance) {
      throw new NotFoundException('Cannot find this finance.');
    }

    return finance;
  }

  async update(id: string, dto: UpdateMonthlyFinanceDto, userId: string) {
    const finance = await this.monthlyFinanceRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!finance) {
      throw new NotFoundException('Cannot find this finance');
    }

    Object.assign(finance, dto);

    return this.monthlyFinanceRepo.save(finance);
  }

  async remove(id: string, userId: string) {
    const finance = await this.monthlyFinanceRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!finance) {
      throw new NotFoundException('Không tìm thấy tháng tài chính.');
    }

    return this.monthlyFinanceRepo.remove(finance);
  }
}
