import { Category } from 'src/modules/category/entities/category.entity';
import { FixedCost } from 'src/modules/fixed-cost/entities/fixedCost.entity';
import { MonthlyFinance } from 'src/modules/monthly-finance/entities/monthlyFinance.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '100',
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '100',
  })
  password: string;

  @OneToMany(() => MonthlyFinance, (mf) => mf.user)
  monthlyFinances: MonthlyFinance[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @ManyToMany(() => FixedCost, (fixedCost) => fixedCost.users)
  fixedCosts: FixedCost[];
}
