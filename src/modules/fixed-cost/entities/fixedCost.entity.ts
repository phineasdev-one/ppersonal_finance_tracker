import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonthlyFixedCost } from './monthlyFixedCost.entity';
import { User } from 'src/modules/users/entities/user.entity';

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

  @ManyToMany(() => User, (user) => user.fixedCosts)
  @JoinTable()
  users: User[];
}
