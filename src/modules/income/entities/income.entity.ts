import { MonthlyFinance } from 'src/modules/monthly-finance/entities/monthlyFinance.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MonthlyFinance, (mf) => mf.incomes, {
    onDelete: 'CASCADE',
  })
  monthlyFinance: MonthlyFinance;

  @Column()
  name: string;

  @Column('float')
  amount: number;
}
