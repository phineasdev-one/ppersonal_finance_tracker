import { Category } from 'src/modules/category/entities/category.entity';
import { MonthlyFinance } from 'src/modules/monthly-finance/entities/monthlyFinance.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryBudget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (c) => c.categoryBudgets)
  category: Category;

  @ManyToOne(() => MonthlyFinance, (mf) => mf.categoryBudgets)
  monthlyFinance: MonthlyFinance;

  @Column('float')
  plannedAmount: number;

  @Column('float')
  spentAmout: number;
}
