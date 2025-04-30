import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMonthlyFinanceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalIncome?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalSpend?: number;
}
