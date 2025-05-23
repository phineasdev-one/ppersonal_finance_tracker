import { CategoryBudget } from 'src/modules/category-budget/entities/categoryBudget.entity';
import { FixedCost } from 'src/modules/fixed-cost/entities/fixedCost.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => FixedCost, (fc) => fc.category)
  fixedCosts: FixedCost[];

  @OneToMany(() => Transaction, (t) => t.category)
  transactions: Transaction[];

  @OneToMany(() => CategoryBudget, (cb) => cb.category)
  categoryBudgets: CategoryBudget[];

  @ManyToOne(() => User, user => user.categories, { onDelete: 'CASCADE' })
  user: User;
}
