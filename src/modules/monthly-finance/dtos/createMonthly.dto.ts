import { ApiProperty } from '@nestjs/swagger';

export class IncomeDto {
  @ApiProperty({ example: 'Lương' })
  name: string;

  @ApiProperty({ example: 12000000 })
  amount: number;
}

export class CreateMonthlyFinanceDto {
  @ApiProperty({ example: 4, description: 'Tháng (1-12)' })
  month: number;

  @ApiProperty({ example: 2025, description: 'Năm tài chính' })
  year: number;

  @ApiProperty({
    type: [IncomeDto],
    description: 'Danh sách nguồn thu nhập',
  })
  incomes: IncomeDto[];
}
