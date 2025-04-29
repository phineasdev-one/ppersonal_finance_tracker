import { MonthlyFinance } from 'src/modules/monthly-finance/entities/monthlyFinance.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { FixedCost } from './fixedCost.entity';

@Entity()
export class MonthlyFixedCost {
  @PrimaryColumn()
  monthlyFinanceId: string;

  @PrimaryColumn()
  fixedCostId: string;

  @Column()
  effectiveMonth: number;

  @Column()
  effectiveYear: number;

  @ManyToOne(() => MonthlyFinance, (mf) => mf.monthlyFixedCosts)
  monthlyFinance: MonthlyFinance;

  @ManyToOne(() => FixedCost, (fc) => fc.monthlyFixedCosts)
  fixedCost: FixedCost;
}
