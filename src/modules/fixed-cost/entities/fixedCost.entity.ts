import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonthlyFixedCost } from './monthlyFixedCost.entity';

@Entity()
export class FixedCost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.fixedCosts)
  category: Category;

  @Column('float')
  amount: number;

  @Column('text')
  note: string;

  @OneToMany(() => MonthlyFixedCost, (mfc) => mfc.fixedCost)
  monthlyFixedCosts: MonthlyFixedCost[];
}
