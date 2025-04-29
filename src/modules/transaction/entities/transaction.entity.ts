import { Category } from 'src/modules/category/entities/category.entity';
import { MonthlyFinance } from 'src/modules/monthly-finance/entities/monthlyFinance.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('float')
  amount: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => MonthlyFinance, (mf) => mf.transactions)
  monthlyFinance: MonthlyFinance;

  @ManyToOne(() => Category, (c) => c.transactions)
  category: Category;
}
