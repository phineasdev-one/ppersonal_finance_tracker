import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Ăn uống' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
