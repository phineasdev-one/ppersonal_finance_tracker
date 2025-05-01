import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dtos/createTransaction.dto';
import { Brackets, Repository } from 'typeorm';
import { UpdateTransactionDto } from './dtos/updateTransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = this.transactionRepo.create({
      transactionType: dto.type,
      amount: dto.amount,
      date: new Date(dto.date),
      category: { id: dto.categoryId },
      monthlyFinance: { id: dto.monthlyFinanceId },
    });

    return this.transactionRepo.save(transaction);
  }

  async findAllByMonthYear(userId: string, month: number, year: number) {
    return this.transactionRepo
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.monthlyFinance', 'monthlyFinance')
      .where('monthlyFinance.userId = :userId', { userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('monthlyFinance.month = :month', { month }).andWhere(
            'monthlyFinance.year = :year',
            { year },
          );
        }),
      )
      .getMany();
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: ['category', 'monthlyFinance'],
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const transaction = await this.transactionRepo.preload({
      id,
      ...dto,
      category: dto.categoryId ? { id: dto.categoryId } : undefined,
      monthlyFinance: dto.monthlyFinanceId
        ? { id: dto.monthlyFinanceId }
        : undefined,
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return this.transactionRepo.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.transactionRepo.findOneBy({ id });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return this.transactionRepo.remove(transaction);
  }
}
