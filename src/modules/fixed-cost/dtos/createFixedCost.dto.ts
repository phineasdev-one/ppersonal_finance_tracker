import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString } from 'class-validator';

export class CreateFixedCostDto {
  @ApiProperty({ description: 'Category ID of the fixed cost', type: String })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'Amount of the fixed cost', example: 1000000 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Note or description for the fixed cost',
    example: 'Monthly rent',
  })
  @IsString()
  note: string;
}
