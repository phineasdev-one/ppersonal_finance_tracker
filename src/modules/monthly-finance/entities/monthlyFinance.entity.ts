import { CategoryBudget } from 'src/modules/category-budget/entities/categoryBudget.entity';
import { MonthlyFixedCost } from 'src/modules/fixed-cost/entities/monthlyFixedCost.entity';
import { Income } from 'src/modules/income/entities/income.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MonthlyFinance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  totalIncome: number;

  @Column('float')
  totalSpend: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.monthlyFinances)
  user: User;

  @OneToMany(() => Transaction, (t) => t.monthlyFinance)
  transactions: Transaction[];

  @OneToMany(() => MonthlyFixedCost, (mfc) => mfc.monthlyFinance)
  monthlyFixedCosts: MonthlyFixedCost[];

  @OneToMany(() => CategoryBudget, (cb) => cb.monthlyFinance)
  categoryBudgets: CategoryBudget[];

  @OneToMany(() => Income, (income) => income.monthlyFinance)
  incomes: Income[];
}
