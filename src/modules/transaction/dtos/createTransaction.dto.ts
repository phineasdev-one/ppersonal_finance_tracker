import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsEnum } from 'class-validator';
import { TransactionType } from '../transactioin.type';

export class CreateTransactionDto {
  @ApiProperty({ enum: TransactionType, example: 'IN' })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2025-04-01' })
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  monthlyFinanceId: string;
}
